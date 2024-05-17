import { useEffect, useRef } from 'react'
import { RPC } from '../../tools'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore, usePlayerStore, useOpponentStore, useRoundOrderStore } from '../../store'
import Button from '../Button'

function RoundOrder() {
  const state = useRoundOrderStore()
  const { changeTitle, changeStatus, changeCurrentPlayer } = useGameStore()
  const player = usePlayerStore()
  const opponent = useOpponentStore()
  const diceArea = useRef<HTMLDivElement>(null)

  // 监听对手投掷骰子
  useEffect(() => {
    RPC.register('throwDice', async (point: number) => {
      handleOpponentThrow(point)
    })
    player.reset()
    opponent.reset()
    state.reset()
  }, [])

  // 玩家投掷骰子
  const handlePlayerThrow = () => {
    const key = new Date().getTime()
    const point = Math.floor(Math.random() * 6) + 1
    const rect = diceArea.current?.getBoundingClientRect()
    let x = rect?.width ? Math.floor(Math.random() * rect.width / 2 - 50) : 0
    let y = rect?.height ? Math.floor(Math.random() * rect.height / 2 - 50) : 0
    x = Math.random() > 0.5 ? x : -x
    y = Math.random() > 0.5 ? y : -y
    const position = [x, y]
    const rotate = Math.floor(Math.random() * 360)
    state.setThrowEnable(false)
    state.updatePlayer({ key, point, position, rotate })
    RPC.call('throwDice', point, RPC.Mode.OTHERS)
  }

  // 对手投掷骰子
  const handleOpponentThrow = (point: number) => {
    const key = new Date().getTime()
    const rect = diceArea.current?.getBoundingClientRect()
    let x = rect?.width ? Math.floor(Math.random() * rect.width / 2 - 50) : 0
    let y = rect?.height ? Math.floor(Math.random() * rect.height / 2 - 50) : 0
    x = Math.random() > 0.5 ? x : -x
    y = Math.random() > 0.5 ? y : -y
    const position = [x, y]
    const rotate = Math.floor(Math.random() * 360)
    state.updateOpponent({ key, point, position, rotate })
  }

  // 判断先后手
  useEffect(() => {
    setTimeout(() => {
      if (state.opponent.point && state.player.point) {
        if (state.opponent.point > state.player.point) {
          changeTitle('对方先手')
          changeCurrentPlayer(opponent.id)
          setTimeout(() => {
            changeStatus('round')
            setTimeout(() => {
              state.reset()
            }, 500)
          }, 1000)
        } else if (state.opponent.point < state.player.point) {
          changeTitle('我方先手')
          changeCurrentPlayer(player.id)
          setTimeout(() => {
            changeStatus('round')
            setTimeout(() => {
              state.reset()
            }, 500)
          }, 1000)
        } else {
          changeTitle('平局')
          state.reset()
        }
      }
    }, 500)
  }, [state.opponent.point, state.player.point])

  return (
    <div className='w-full h-full flex flex-col space-y-2'>
      <p className="text-center font-bold text-sky-400">准备阶段</p>
      <div className="flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <div className="flex flex-1 justify-center items-center">
          <AnimatePresence>
            {
              state.opponent.point &&
              <motion.div
                key={state.opponent.key}
                initial={{ opacity: 0, scale: 1.2, x: state.opponent.position[0], y: state.opponent.position[1], rotate: state.opponent.rotate }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className='absolute w-15 h-15 border-2 border-gray-500 rounded shadow'
                style={{
                  transform: `translate(${state.opponent.position[0]}px, ${state.opponent.position[1]}px) rotate(${state.opponent.rotate}deg`
                }}
              >
                <img src={`./img/dice_${state.opponent.point}.svg`} alt="" />
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
      <p className="text-center text-sky-400">双方投掷一枚点数骰子以决定先后手顺序</p>
      <div className="flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <div ref={diceArea} className="flex flex-1 justify-center items-center">
          <AnimatePresence>
            {
              state.player.point &&
              <motion.div
                key={state.player.key}
                initial={{ opacity: 0, scale: 1.2, x: state.player.position[0], y: state.player.position[1], rotate: state.player.rotate }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className='absolute w-15 h-15 border-2 border-gray-500 rounded shadow'
                style={{
                  transform: `translate(${state.player.position[0]}px, ${state.player.position[1]}px) rotate(${state.player.rotate}deg`
                }}
              >
                <img src={`./img/dice_${state.player.point}.svg`} alt="" />
              </motion.div>
            }
          </AnimatePresence>
        </div>
      </div>
      <Button onClick={() => handlePlayerThrow()} color="sky" disabled={!state.throwEnable}>投掷</Button>
    </div>
  )
}

export default RoundOrder
