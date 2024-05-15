import { useRef, useEffect } from 'react'
import Tippy from '@tippyjs/react'
import { hideAll } from 'tippy.js'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { RPC } from '../../tools'
import { useGameStore, usePlayerStore, useOpponentStore, useRoundStore } from '../../store'
import ActionDice from '../../components/dice/ActionDice'
import Button from '../Button'
import { chars } from '../../data'

function Round() {
  const state = useRoundStore()
  const { currentPlayer, changeCurrentPlayer, changeTitle, changeStatus } = useGameStore()
  const player = usePlayerStore()
  const opponent = useOpponentStore()
  const actionArea = useRef<HTMLDivElement>(null)
  const diceArea = useRef<HTMLDivElement>(null)

  useEffect(() => {
    state.reset()
    RPC.register('throw', async (points: number[]) => {
      handleThrow(points)
    })
    RPC.register('select', async (index: number) => {
      handleSelect(index)
    })
    RPC.register('use', async () => {
      state.useDice()
    })
    RPC.register('finishRound', async () => {
      handleFinishRound()
    })
  }, [])

  const handlePlayerThrow = () => {
    const points = Array(6).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
    handleThrow(points)
    RPC.call('throw', points, RPC.Mode.OTHERS)
  }

  const handleThrow = (points: number[]) => {
    const state = useRoundStore.getState()
    const rect = diceArea.current?.getBoundingClientRect()
    const newDices: any = []
    state.dices.map(dice => {
      if (dice.used || dice.selected) {
        newDices.push(dice)
      } else {
        const key = new Date().getTime()
        const point = points[dice.index]
        let x = rect?.width ? Math.floor(Math.random() * rect.width / 4) : 0
        let y = rect?.height ? Math.floor(Math.random() * rect.height / 4) : 0
        x = Math.random() > 0.5 ? x : -x
        y = Math.random() > 0.5 ? y : -y
        const position = [x, y]
        const rotate = Math.floor(Math.random() * 360)
        newDices.push({ ...dice, key, point, position, rotate })
      }
    })
    state.ranDomDiceSort()
    state.setDices(newDices)
    state.setActiveDelay(true)
    state.setRound(state.round - 1)
  }

  const handleSelect = (index: number) => {
    state.selectDice(index)
  }

  // 监听骰子选择
  useEffect(() => {
    const selectedDices = state.dices.filter(dice => dice.selected && !dice.used)
    const actionDices = selectedDices.filter(dice => dice.type === 'action')
    const numberDices = selectedDices.filter(dice => dice.type === 'number')
    if (actionDices.length === 1) {
      const actionDice = actionDices[0]
      const action = chars[actionDice.id].actions[actionDice.point - 1]
      if (action.value && !numberDices.length || !action.value && numberDices.length) {
        state.setAction(action)
      } else {
        state.setAction(null)
      }
    } else {
      state.setAction(null)
    }
    const offsetList = state.offsetList
    state.dices.map(dice => {
      const diceIndex = dice.index
      if (dice.selected) {
        const diceDom = document.querySelector(`[data-dice="${diceIndex}"]`) as HTMLElement
        const diceRect = diceDom.getBoundingClientRect()
        const diceAreaDom = document.querySelector(`[data-dice-area="${diceIndex}"]`) as HTMLElement
        const diceAreaRect = diceAreaDom.getBoundingClientRect()
        offsetList[diceIndex][0] += diceRect.left + diceRect.width / 2 - diceAreaRect.left - diceAreaRect.width / 2
        offsetList[diceIndex][1] += diceRect.top + diceRect.height / 2 - diceAreaRect.top - diceAreaRect.height / 2
      } else {
        offsetList[diceIndex] = [0, 0]
      }
    })
    state.setOffsetList(offsetList)
    console.log(state.offsetList)
  }, [state.dices])

  // 初始化骰子
  useEffect(() => {
    let dices = []
    let charList: number[] = []
    if (currentPlayer === player.id) {
      charList = player.charList
    } else if (currentPlayer === opponent.id) {
      charList = opponent.charList
    }
    for (let i = 0; i < 3; i++) {
      dices.push({
        index: i,
        key: 0,
        type: 'number',
        point: 0,
        position: [0, 0],
        rotate: 0,
        selected: false,
        used: false,
      })
    }
    for (let i = 0; i < 3; i++) {
      dices.push({
        index: i + 3,
        id: charList[i],
        key: 0,
        type: 'action',
        point: 0,
        position: [0, 0],
        rotate: 0,
        selected: false,
        used: false,
      })
    }
    state.setDiceSort(Array(6).fill(0).map((_, i) => i))
    state.setDices(dices)
  }, [currentPlayer])

  const handleAction = () => {
    let actionValue = 0
    if (state.action.value) {
      actionValue = state.action.value
    } else {
      state.dices.filter(dice => dice.selected && dice.type === 'number').map(dice => {
        actionValue += dice.point
      })
    }
    if (state.action.type === 'attack') {
      let damage = actionValue
      if (opponent.shield > 0) {
        const newShield = (opponent.shield - actionValue) < 0 ? 0 : opponent.shield - actionValue
        opponent.set('shield', newShield)
        RPC.call('setOpponent', { shield: newShield }, RPC.Mode.OTHERS)
        damage = actionValue - opponent.shield
      }
      if (damage > 0) {
        const newHp = (opponent.hp - damage) < 0 ? 0 : opponent.hp - damage
        console.log(newHp)
        opponent.set('hp', newHp)
        RPC.call('setOpponent', { hp: newHp }, RPC.Mode.OTHERS)
      }
    } else if (state.action.type === 'shield') {
      const newShield = player.shield + actionValue
      player.set('shield', newShield)
      RPC.call('setPlayer', { shield: newShield }, RPC.Mode.OTHERS)
    } else if (state.action.type === 'heart') {
      const newHp = (player.hp + actionValue) > player.hpMax ? player.hpMax : player.hp + actionValue
      player.set('hp', newHp)
      RPC.call('setPlayer', { hp: newHp }, RPC.Mode.OTHERS)
    }
    state.useDice()
    state.setAction(null)
    RPC.call('use', null, RPC.Mode.OTHERS)
  }

  const handleFinishRound = () => {
    const currentPlayer = useGameStore.getState().currentPlayer
    if (currentPlayer === player.id) {
      changeCurrentPlayer(opponent.id)
      changeTitle('对方回合')
    } else if (currentPlayer === opponent.id) {
      changeCurrentPlayer(player.id)
      changeTitle('我方回合')
    }
    state.setRound(3)
  }

  // 监听血量变化，判断胜负
  useEffect(() => {
    if (player.hp === 0 || opponent.hp === 0) {
      changeStatus('result')
    }
  }, [player.hp, opponent.hp])

  return (
    <div className='w-full h-full flex flex-col space-y-2'>
      <p className="text-center font-bold text-sky-400">
        {currentPlayer !== player.id ? '对' : '我'}方行动中
      </p>
      {/* 放置区域 */}
      <div
        ref={actionArea}
        className="flex flex-wrap justify-center items-center border-3 border-dashed border-sky-200 rounded-xl p-1 h-20"
      >
        {
          state.dices.filter(dice => dice.selected).map(dice => (
            <div key={dice.index} data-dice-area={dice.index} className='w-15 h-15 m-0.5'>
            </div>
          ))
        }
        {/* <AnimatePresence>
          {
            state.dices.filter(dice => dice.selected).map(dice => (
              <motion.div
                key={dice.index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, pointerEvents: 'none' }}
                className='m-0.5 cursor-pointer'
                layout
                onClick={() => {
                  if (currentPlayer !== player.id) return
                  state.selectDice(dice.index)
                  state.setActiveDelay(false)
                  RPC.call('select', dice.index, RPC.Mode.OTHERS)
                  hideAll()
                }}
              >
                {
                  dice.type === 'number' ?
                    <img
                      className='w-15 h-15 border-2 border-gray-500 rounded bg-white'
                      src={`./img/dice_${dice.point}.svg`} alt=""
                    /> :
                    <Tippy
                      content={
                        <div
                          className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
                        >
                          <p className='font-bold text-sky-400 text-center'>{chars[(dice.id as number)].name}</p>
                          <div className='grid grid-cols-3 gap-2'>
                            {
                              Array(6).fill(0).map((_, i) => (
                                <ActionDice key={i} char={chars[(dice.id as number)]} action={i} />
                              ))
                            }
                          </div>
                          <div className='text-center'>
                            <p className='text-sky-400 font-bold'>
                              {chars[dice.id].actions[state.dices[dice.index].point - 1].name}
                            </p>
                            <p className='text-dark-100'>
                              {chars[dice.id].actions[state.dices[dice.index].point - 1].desc}
                            </p>
                          </div>
                        </div>
                      }
                      arrow={false}
                      hideOnClick={false}
                      delay={[500, 0]}
                    >
                      <ActionDice
                        char={chars[(dice.id as number)]}
                        action={dice.point - 1}
                      />
                    </Tippy>
                }
              </motion.div>
            ))
          }
        </AnimatePresence> */}
      </div>
      <Button
        onClick={() => handleAction()}
        color="amber"
        disabled={!state.action?.name || currentPlayer !== player.id}
      >
        {state.action?.name || '行动'}
      </Button>
      {/* 投掷区域 */}
      <div className="flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <div className="grid grid-cols-3 h-full">
          {
            state.diceSort.map((index, i) => (
              <div key={i} ref={diceArea} className='flex justify-center items-center'>
                <AnimatePresence initial={false}>
                  {
                    state.dices[index]?.point && !state.dices[index].used &&
                    <motion.div
                      key={state.dices[index].key}
                      data-dice={index}
                      initial={{
                        opacity: 0,
                        scale: 1.2,
                        x: state.dices[index].position[0],
                        y: state.dices[index].position[1],
                        rotate: state.dices[index].selected ? 0 : state.dices[index].rotate,
                        transformOrigin: 'center center'
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        x: state.dices[index].position[0] - state.offsetList[index][0],
                        y: state.dices[index].position[1] - state.offsetList[index][1],
                        rotate: state.dices[index].selected ? 0 : state.dices[index].rotate,
                        transition: { delay: state.activeDelay ? 0.05 * index : 0 }
                      }}
                      exit={{ opacity: 0, pointerEvents: 'none' }}
                      className='absolute w-15 h-15 shadow cursor-pointer'
                      style={{
                        transform: `translate(${state.dices[index].position[0]}px, ${state.dices[index].position[1]}px) rotate(${state.dices[index].rotate}deg`
                      }}
                      onClick={() => {
                        if (currentPlayer !== player.id) return
                        state.setActiveDelay(false)
                        state.selectDice(index)
                        RPC.call('select', index, RPC.Mode.OTHERS)
                        hideAll()
                      }}
                    >
                      {
                        state.dices[index].type === 'number' ?
                          <img
                            className='border-2 border-gray-500 rounded bg-white'
                            src={`./img/dice_${state.dices[index].point}.svg`} alt=""
                          /> :
                          <Tippy
                            content={
                              <div
                                className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
                              >
                                <p className='font-bold text-sky-400 text-center'>{chars[(state.dices[index].id as number)].name}</p>
                                <div className='grid grid-cols-3 gap-2'>
                                  {
                                    Array(6).fill(0).map((_, i) => (
                                      <ActionDice key={i} char={chars[(state.dices[index].id as number)]} action={i} />
                                    ))
                                  }
                                </div>
                                <div className='text-center'>
                                  <p className='text-sky-400 font-bold'>
                                    {chars[(state.dices[index].id as number)].actions[state.dices[index].point - 1].name}
                                  </p>
                                  <p className='text-dark-100'>
                                    {chars[(state.dices[index].id as number)].actions[state.dices[index].point - 1].desc}
                                  </p>
                                </div>
                              </div>
                            }
                            arrow={false}
                            hideOnClick={false}
                            delay={[500, 0]}
                          >
                            <ActionDice
                              char={chars[(state.dices[index].id as number)]}
                              action={state.dices[index].point - 1}
                            />
                          </Tippy>
                      }
                    </motion.div>
                  }
                </AnimatePresence>
              </div>
            ))
          }
        </div>
      </div>
      <div className="relative flex justify-center space-x-2">
        <Button
          color='sky'
          className="flex-1"
          disabled={
            state.round === 0 ||
            currentPlayer !== player.id ||
            state.dices.filter(dice => !dice.used && !dice.selected).length === 0
          }
          onClick={() => handlePlayerThrow()}
        >
          投掷<span className="opacity-80 ml-2">剩余 {state.round} 次</span>
        </Button>
        <Button
          color="rose"
          disabled={currentPlayer !== player.id}
          onClick={() => RPC.call('finishRound', null, RPC.Mode.ALL)}
        >
          结束回合
        </Button>
      </div>
    </div>
  )
}

export default Round
