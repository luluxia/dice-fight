import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore, usePlayerStore, useOpponentStore } from '../store'
import RoundOrder from '../components/game/RoundOrder'
// import BanPick from '../components/game/BanPick'
import Round from '../components/game/Round'
import Result from '../components/game/Result'

const components: {
  [key: string]: React.FC
} = {
  'round-order': RoundOrder,
  // 'ban-pick': BanPick,
  'round': Round,
  'result': Result,
}

function Game() {
  const { status, title } = useGameStore()

  const player = usePlayerStore()
  const opponent = useOpponentStore()

  const ComponentToRender = components[status]

  return (
    <>
      <AnimatePresence>
        {
          title &&
          <motion.div
            className="absolute w-screen h-full flex z-1 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='pattern-diagonal-stripes-md !bg-sky-400 text-white/15 m-auto w-full text-center p-4'
              initial={{ clipPath: 'inset(50% 0 50% 0)' }}
              animate={{ clipPath: 'inset(0 0 0 0)' }}
              exit={{ clipPath: 'inset(50% 0 50% 0)' }}
            >
              <p className='text-3xl font-bold text-white text-shadow'>{title}</p>
            </motion.div>
          </motion.div>
        }
      </AnimatePresence>
      <div className='h-full flex flex-col py-4 max-w-screen-sm m-auto'>
        {/* 顶部栏 */}
        {/* <div className="p-5 flex justify-end space-x-2">
          <p>退出</p>
          <p>设置</p>
          <p>{status}</p>
        </div> */}
        {/* 敌方信息 */}
        <div className='px-5 flex justify-center items-center space-x-2'>
          <div className='w-15 h-15 bg-white rounded-full shadow-sm border-2 border-white'></div>
          <div className='flex-1 space-y-1 text-center'>
            <p className="text-white text-shadow-sm">{opponent.id}</p>
            <div className='relative h-6 bg-white/20 rounded-xl border-white border-2 text-sm shadow-sm flex justify-center'>
              <div className='absolute rounded-xl w-full h-full overflow-hidden'>
                <div
                  className='h-full bg-lime-300'
                  style={{
                    transform: `translateX(-${100 - (opponent.hp / opponent.hpMax) * 100}%)`,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                ></div>
              </div>
              <p className="absolute text-white text-shadow-sm font-bold">{opponent.hp} / {opponent.hpMax}</p>
              <AnimatePresence>
                {
                  opponent.shield &&
                  <motion.div
                    key={'shield'}
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='absolute w-12 -bottom-2 -right-4 flex justify-center items-center'
                  >
                    <img className='drop-shadow' src="./img/action/shield.png" alt="" />
                    <p className='absolute font-bold text-sky-400'>{opponent.shield}</p>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
        {/* 操作界面 */}
        <div className='flex-1 px-2 py-4'>
          <div className='relative w-full h-full bg-white rounded-xl shadow-xl'>
            <AnimatePresence>
              <motion.div
                key={status}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='absolute w-full h-full p-3'
              >
                <ComponentToRender />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        {/* 我方信息 */}
        <div className='px-5 flex justify-center items-center space-x-2'>
          <div className='w-15 h-15 rounded-full shadow-sm border-2 border-white bg-white/50 overflow-hidden'>
            <img src="./img/avatar/0.png" alt="" />
          </div>
          <div className='flex-1 space-y-1 text-center'>
            <p className="text-white text-shadow-sm">{player.id}</p>
            <div className='relative h-6 bg-white/20 rounded-xl border-white border-2 text-sm shadow-sm flex justify-center'>
              <div className='absolute rounded-xl w-full h-full overflow-hidden'>
                <div
                  className='h-full bg-lime-300'
                  style={{
                    transform: `translateX(-${100 - (player.hp / player.hpMax) * 100}%)`,
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                ></div>
              </div>
              <p className="absolute text-white text-shadow-sm font-bold">{player.hp} / {player.hpMax}</p>
              <AnimatePresence>
                {
                  player.shield &&
                  <motion.div
                    key={'shield'}
                    initial={{ opacity: 0, scale: 1.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className='absolute w-12 -bottom-2 -right-4 flex justify-center items-center'
                  >
                    <img className='drop-shadow' src="./img/action/shield.png" alt="" />
                    <p className='absolute font-bold text-sky-400'>{player.shield}</p>
                  </motion.div>
                }
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Game
