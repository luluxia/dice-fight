import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Tippy from '@tippyjs/react'
import { hideAll } from 'tippy.js'
import { useStore } from '../store'
import ActionDice from '../components/dice/ActionDice'
import Button from '../components/Button'
import { chars } from '../data'
import { driver } from 'driver.js'
import 'driver.js/dist/driver.css'

function Tutorial() {
  const [state, setState] = useState<{
    step: number,
    opponent: { hp: number, hpMax: number },
    player: { hp: number, hpMax: number },
    dices: any[],
    action: any,
    round: number,
    selectedDicesPosition: [number, number][],
    activeDelay: boolean,
  }>({
    step: 1,
    opponent: {
      hp: 20,
      hpMax: 30,
    },
    player: {
      hp: 20,
      hpMax: 30,
    },
    dices: [],
    action: null,
    round: 3,
    selectedDicesPosition: [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]],
    activeDelay: false,
  })
  const { changePage } = useStore()
  const diceArea = useRef<HTMLDivElement>(null)
  const actionArea = useRef<HTMLDivElement>(null)

  const driverObj = driver({
    steps: [
      {
        element: '#throw',
        popover: {
          title: '欢迎来到《骰子大作战》',
          description: `
          <p>《骰子大作战》是一个回合制对战游戏。</p>
          <p>双方将各自携带3枚点数骰子和3枚角色骰子来进行战斗。</p>
          <p>首先请点击投掷按钮，投掷骰子吧。</p>
          `,
          side: 'top',
        },
      },
      {
        element: '#throw-area',
        popover: {
          title: '骰子类型',
          description: `
          <p>点数骰子的六个面都是数字，分别为1~6。</p>
          <p>角色骰子的六个面，则代表了不同的角色行动，例如攻击、护盾、恢复…，其中灰色面，代表行动落空，无法被使用。</p>
          <p>将鼠标移至角色骰子上或长按，可以查看行动的详细说明。</p>
          <p>确认完毕后，就点击下一步吧。</p>
          `,
        },
        onHighlightStarted() {
          handleThrow([1, 2, 6, 1, 6, 6])
        }
      },
      {
        element: '#dice-5',
        popover: {
          title: '选取行动骰子',
          description: `
          <p>点击骰子，可以将其在投掷区域和行动区域之间切换。</p>
          <p>现在，请点击牧师骰子，将其放入行动区域。</p>
          `
        },
      },
      {
        element: '#action',
        popover: {
          title: '发动行动',
          description: `
          <p>当行动栏中只放置了一枚角色骰子时，可以消耗骰子发动相应的行动。</p>
          <p>现在，请点击行动按钮，消耗牧师骰子，为自身恢复6点生命</p>
          `,
          side: 'bottom',
        },
        onHighlightStarted() {
          selectDice(5)
        }
      },
      {
        element: '#action-area',
        popover: {
          title: '重新投掷',
          description: `
          <p>你可以将需要保留的骰子放置在行动区域，然后重新投掷。</p>
          <p>每回合都有3次重新投掷的机会。</p>
          <p>确认完毕后，就点击下一步吧。</p>
          `,
        },
        onHighlightStarted() {
          useDice()
          setState(state => ({
            ...state,
            player: {
              ...state.player,
              hp: state.player.hp + 6
            }
          }))
        }
      },
      {
        element: '#dice-2',
        popover: {
          title: '重新投掷',
          description: `
          <p>现在，让我们选取需要保留的点数骰子。</p>
          `
        }
      },
      {
        element: '#dice-3',
        popover: {
          title: '重新投掷',
          description: `
          <p>继续选取需要保留的角色骰子。</p>
          `
        },
        onHighlightStarted() {
          selectDice(2)
        }
      },
      {
        element: '#throw',
        popover: {
          title: '重新投掷',
          description: `
          <p>然后，让我们点击投掷按钮，重新投掷我们不需要的骰子。</p>
          `,
          side: 'top',
        },
        onHighlightStarted() {
          selectDice(3)
        }
      },
      {
        element: '#throw-area',
        popover: {
          title: '重新投掷',
          description: `
          <p>通过保留和重新投掷骰子，是我们赢得对局的关键。</p>
          <p>确认完毕后，就点击下一步吧。</p>
          `
        },
        onHighlightStarted() {
          handleThrow([5, 6, 6, 1, 4, 6])
        }
      },
      {
        element: '#dice-0',
        popover: {
          title: '选取点数骰子',
          description: `
          <p>当行动栏中放置了右下角没有点数的角色骰子时，</p>
          <p>需要配合点数骰子来发动行动。</p>
          <p>我们选取剩下的点数骰子，来发动更高的伤害。</p>
          `
        }
      },
      {
        element: '#dice-1',
        popover: {
          title: '选取点数骰子',
          description: `
          <p>选取最后一个点数骰子。</p>
          `
        },
        onHighlightStarted() {
          selectDice(0)
        }
      },
      {
        element: '#action',
        popover: {
          title: '发动组合行动',
          description: `
          <p>此时，行动栏中有一枚攻击行动的角色骰子和总计17点的点数骰子。</p>
          <p>因此我们可以消耗这些骰子，打出17点的高额伤害。</p>
          `,
          side: 'bottom',
        },
        onHighlightStarted() {
          selectDice(1)
        }
      },
      {
        element: '#dice-4',
        popover: {
          title: '选取角色骰子',
          description: `
          <p>对手只剩下3点生命了，而此时我们还剩下一枚可以造成6点固定伤害的角色骰子。</p>
          <p>选取骰子，一鼓作气战胜对手吧。</p>
          `
        },
        onHighlightStarted() {
          useDice()
          setState(state => ({
            ...state,
            opponent: {
              ...state.opponent,
              hp: state.opponent.hp - 17
            }
          }))
        }
      },
      {
        element: '#action',
        popover: {
          title: '发动行动',
          description: `
          <p>当对手的生命被降为0时，即可获得游戏胜利。</p>
          `,
          side: 'bottom',
        },
        onHighlightStarted() {
          selectDice(4)
        }
      },
      {
        popover: {
          title: '新手教程结束',
          description: `
          <p>太棒啦！新手教程结束，你已经完全理解游戏了。</p>
          <p>接下来可以前往多人游戏与小伙伴们一较高下！</p>
          <p>祝你玩的开心，再见啦！</p>
          `
        },
        onHighlightStarted() {
          useDice()
          setState(state => ({
            ...state,
            opponent: {
              ...state.opponent,
              hp: 0
            }
          }))
        }
      }
    ],
    nextBtnText: '下一步',
    doneBtnText: '结束教程',
    showButtons: ['next'],
    allowClose: false,
    onDestroyed() {
      changePage('index')
    }
  })

  useEffect(() => {
    let dices = []
    // 战士 弓箭手 牧师
    let charList: number[] = [0, 1, 4]
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
    setState((state: any) => ({ ...state, dices }))
    setTimeout(() => {
      driverObj.drive()
    }, 500)
  }, [])

  const handleThrow = (points: number[]) => {
    const randomList = Array(6).fill(0).map((_, i) => i)
    randomList.sort(() => Math.random() - 0.5)
    const newDices: any = []
    state.dices.map((dice: any, index: number) => {
      const rect = document.querySelector(`[data-dice="${randomList[index]}"]`)?.getBoundingClientRect()
      const key = new Date().getTime()
      const point = points[index]
      let x = 0, y = 0
      if (rect) {
        x = rect.left + Math.random() * (rect.width - 60)
        y = rect.top + Math.random() * (rect.height - 60)
      }
      const position = [x, y]
      const rotate = Math.floor(Math.random() * 360)
      if (dice.used || dice.selected) {
        newDices.push({ ...dice, position, rotate })
      } else {
        newDices.push({ ...dice, key, point, position, rotate })
      }
    })
    setState(state => ({
      ...state,
      dices: newDices,
      activeDelay: true,
      round: state.round - 1,
      step: 2,
    }))
  }

  const selectDice = (index: number) => {
    const newSelected = !state.dices[index].selected
    setState(state => ({
      ...state,
      dices: state.dices.map(dice => {
        if (dice.index === index) {
          dice.selected = newSelected
        }
        return dice
      })
    }))
  }

  const useDice = () => {
    setState(state => ({
      ...state,
      dices: state.dices.map(dice => {
        if (dice.selected) {
          dice.selected = false
          dice.used = true
        }
        return dice
      })
    }))
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
        setState(state => ({ ...state, action }))
      } else {
        setState(state => ({ ...state, action: null }))
      }
    } else {
      setState(state => ({ ...state, action: null }))
    }
    const selectedDicesPosition = state.selectedDicesPosition
    state.dices.map(dice => {
      const diceIndex = dice.index
      if (dice.selected) {
        const diceAreaDom = document.querySelector(`[data-dice-area="${diceIndex}"]`) as HTMLElement
        const diceAreaRect = diceAreaDom.getBoundingClientRect()
        selectedDicesPosition[diceIndex][0] = diceAreaRect.left
        selectedDicesPosition[diceIndex][1] = diceAreaRect.top
        if (diceAreaRect.width < 60) {
          selectedDicesPosition[diceIndex][0] -= (60 - diceAreaRect.width) / 2
        }
      }
    })
    setState(state => ({ ...state, selectedDicesPosition }))
  }, [state.dices])

  return (
    <div className='h-full flex flex-col py-4 max-w-screen-sm m-auto'>
      <div className='relative px-5 flex justify-center items-center'>
        <div
          className={`
            w-15 h-15 rounded-full shadow-sm border-2 border-sky-200
            pattern-diagonal-stripes-sm !bg-sky-50 text-sky-100 overflow-hidden mr-3
          `}
        >
          <img src="./img/avatar/0.png" alt="" />
        </div>
        <div className='flex-1 space-y-1 text-center'>
          <p className="text-white text-shadow-sm">冷酷的对手</p>
          <div className='relative h-6 bg-white/20 rounded-xl border-white border-2 text-sm shadow-sm flex justify-center'>
            <div className='absolute rounded-xl w-full h-full overflow-hidden'>
              <div
                className='h-full bg-lime-300'
                style={{
                  transform: `translateX(-${100 - (state.opponent.hp / state.opponent.hpMax) * 100}%)`,
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              ></div>
            </div>
            <p className="absolute text-white text-shadow-sm font-bold">{state.opponent.hp} / {state.opponent.hpMax}</p>
          </div>
        </div>
      </div>
      {/* 操作界面 */}
      <div className='flex-1 px-2 py-4'>
        <div className='relative w-full h-full bg-white rounded-xl shadow-xl'>
          <div className='w-full h-full flex flex-col space-y-2 p-3'>
            {/* 标题 */}
            <p className='text-center font-bold text-sky-400'>我方行动中</p>
            {/* 行动区域 */}
            <div
              id='action-area'
              ref={actionArea}
              className="flex justify-center items-center border-3 border-dashed border-sky-200 rounded-xl p-1 h-20"
            >
              {
                state.dices.filter((dice: any) => dice.selected).map((dice: any) => (
                  <div key={dice.index} data-dice-area={dice.index} className='w-15 h-15 m-0.5'>
                  </div>
                ))
              }
            </div>
            <div id='action'>
              <Button
                onClick={() => driverObj.moveNext()}
                color="amber"
                disabled={!state.action?.name}
              >
                {state.action?.name || '行动'}
              </Button>
            </div>
            {/* 投掷区域 */}
            <div id='throw-area' ref={diceArea} className="flex-1 border-3 border-dashed border-sky-200 rounded-xl">
              <div className='grid grid-cols-3 h-full'>
                {
                  Array(6).fill(0).map((_, i) => (
                    <div key={i} data-dice={i} className='relative w-full h-full'>
                      <div className='w-full h-full' />
                    </div>
                  ))
                }
              </div>
              {
                state.dices.map((dice: any, index: number) => (
                  <AnimatePresence initial={false} key={index}>
                    {
                      dice.point && !dice.used &&
                      <motion.div
                        id={`dice-${dice.index}`}
                        key={dice.key}
                        initial={{
                          opacity: 0,
                          scale: 1.2,
                          x: dice.selected ? state.selectedDicesPosition[index][0] : dice.position[0],
                          y: dice.selected ? state.selectedDicesPosition[index][1] : dice.position[1],
                          rotate: dice.selected ? 0 : dice.rotate,
                        }}
                        animate={{
                          opacity: 1,
                          scale: 1,
                          x: dice.selected ? state.selectedDicesPosition[index][0] : dice.position[0],
                          y: dice.selected ? state.selectedDicesPosition[index][1] : dice.position[1],
                          rotate: dice.selected ? 0 : dice.rotate,
                          transition: { delay: state.activeDelay ? 0.05 * index : 0, ease: 'easeInOut' }
                        }}
                        exit={{ opacity: 0, pointerEvents: 'none' }}
                        className='fixed left-0 top-0 w-15 h-15 shadow cursor-pointer'
                        style={{
                          transform: `translate(${dice.position[0]}px, ${dice.position[1]}px) rotate(${dice.rotate}deg`
                        }}
                        onClick={() => {
                          driverObj.moveNext()
                          hideAll()
                        }}
                      >
                        {
                          dice.type === 'number' ?
                            <img
                              className='border-2 border-gray-500 rounded bg-white'
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
                                      {chars[(dice.id as number)].actions[dice.point - 1].name}
                                    </p>
                                    <p className='text-dark-100'>
                                      {chars[(dice.id as number)].actions[dice.point - 1].desc}
                                    </p>
                                  </div>
                                </div>
                              }
                              arrow={false}
                              hideOnClick={false}
                              delay={[500, 0]}
                              touch={['hold', 100]}
                            >
                              <ActionDice
                                char={chars[(dice.id as number)]}
                                action={dice.point - 1}
                              />
                            </Tippy>
                        }
                      </motion.div>
                    }
                  </AnimatePresence>
                ))
              }
            </div>
            <div className="relative flex justify-center space-x-2">
              <div id='throw' className="flex-1">
                <Button
                  color='sky'
                  onClick={() => driverObj.moveNext()}
                >
                  投掷<span className="opacity-80 ml-2">剩余 {state.round} 次</span>
                </Button>
              </div>
              <Button color="rose">
                结束回合
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* 我方信息 */}
      <div className='relative px-5 flex justify-center items-center'>
        <div
          className={`
            w-15 h-15 rounded-full shadow-sm border-2 border-sky-200
            pattern-diagonal-stripes-sm !bg-sky-50 text-sky-100 overflow-hidden mr-3
          `}
        >
          <img src="./img/avatar/0.png" alt="" />
        </div>
        <div className='flex-1 space-y-1 text-center'>
          <p className="text-white text-shadow-sm">冷酷的玩家</p>
          <div className='relative h-6 bg-white/20 rounded-xl border-white border-2 text-sm shadow-sm flex justify-center'>
            <div className='absolute rounded-xl w-full h-full overflow-hidden'>
              <div
                className='h-full bg-lime-300'
                style={{
                  transform: `translateX(-${100 - (state.player.hp / state.player.hpMax) * 100}%)`,
                  transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              ></div>
            </div>
            <p className="absolute text-white text-shadow-sm font-bold">{state.player.hp} / {state.player.hpMax}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tutorial
