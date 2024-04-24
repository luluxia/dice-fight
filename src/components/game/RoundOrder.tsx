import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useGameStore } from '../../store'

function RoundOrder() {
  const { changeTitle, set, changeRound } = useGameStore()

  const diceArea = useRef<HTMLDivElement>(null)

  const [state, setState] = useState({
    throwEnable: true,
    opponent: {
      key: 0,
      point: 0,
      position: [0, 0],
      rotate: 0
    },
    player: {
      key: 0,
      point: 0,
      position: [0, 0],
      rotate: 0
    }
  })
  
  const handleThrow = (type: 'opponent' | 'player') => {
    const key = new Date().getTime()
    const point = Math.floor(Math.random() * 6) + 1
    const rect = diceArea.current?.getBoundingClientRect()
    let x = rect?.width ? Math.floor(Math.random() * rect.width / 2 - 50) : 0
    let y = rect?.height ? Math.floor(Math.random() * rect.height / 2 - 50) : 0
    x = Math.random() > 0.5 ? x : -x
    y = Math.random() > 0.5 ? y : -y
    const position = [x, y]
    const rotate = Math.floor(Math.random() * 360)
    setState({
      ...state,
      throwEnable: false,
      [type]: { key, point, position, rotate }
    })
  }

  useEffect(() => {
    setTimeout(() => {
      if (state.opponent.point && state.player.point) {
        if (state.opponent.point > state.player.point) {
          changeTitle('对方先手')
          changeRound('opponent')
          setTimeout(() => {
            set('status', 'ban-pick')
          }, 1000)
        } else if (state.opponent.point < state.player.point) {
          changeTitle('我方先手')
          changeRound('player')
          setTimeout(() => {
            set('status', 'ban-pick')
          }, 1000)
        } else {
          changeTitle('平局')
          setState({
            opponent: { key: 0, point: 0, position: [0, 0], rotate: 0 },
            player: { key: 0, point: 0, position: [0, 0], rotate: 0 },
            throwEnable: true
          })
        }
      }
    }, 500)
  }, [state.opponent.point, state.player.point])

  return (
    <div className='w-full h-full flex flex-col space-y-2'>
      <p onClick={() => handleThrow('opponent')} className="text-center font-bold text-sky-400">准备阶段</p>
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
      <div className="relative flex justify-center space-x-2">
        <div
          onClick={() => handleThrow('player')}
          className={classNames(
            'flex-1 text-center bg-sky-400 py-2 rounded-3xl text-white text-shadow-sm shadow-sm cursor-pointer transition-colors hover:bg-sky-500',
            { 'opacity-50 cursor-not-allowed pointer-events-none': !state.throwEnable }
          )}
        >
          投掷
        </div>
      </div>
    </div>
  )
}

export default RoundOrder
