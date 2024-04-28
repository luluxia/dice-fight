import { usePlayersList, me } from 'playroomkit'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore } from './../store'
import RoundOrder from '../components/game/RoundOrder'
import BanPick from '../components/game/BanPick'
import Round from '../components/game/Round'

const components: {
  [key: string]: React.FC
} = {
  'round-order': RoundOrder,
  'ban-pick': BanPick,
  'round': Round
}

function Game() {
  const { status, title, changeTitle, set } = useGameStore()

  const players = usePlayersList()
  const player = players.find(p => p.id === me().id)
  const opponent = players.find(p => p.id !== me().id)

  const ComponentToRender = components[status]
  
  return (
    <>
    <AnimatePresence>
    {
      title &&
      <motion.div
        className="absolute w-screen h-screen flex z-1 pointer-events-none"
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
          <p className='text-3xl font-bold text-white text-shadow'>{ title }</p>
        </motion.div>
      </motion.div>
    }
    </AnimatePresence>
    <div className='h-screen flex flex-col pb-10 max-w-screen-sm m-auto'>
      {/* 顶部栏 */}
      <div className="p-5 flex justify-end space-x-2">
        <p onClick={() => {
          changeTitle('测试阶段');
          status === 'round-order' ? set('status', 'ban-pick') : set('status', 'round-order')
        }}>测试</p>
        <p>退出</p>
        <p>设置</p>
      </div>
      {/* 敌方信息 */}
      <div className='px-10 flex items-center space-x-2'>
        <div className='w-15 h-15 bg-white rounded-full shadow-sm border-2 border-white'></div>
        <div className='flex-1 space-y-1 text-center'>
          <p className="text-white text-shadow-sm">{ opponent?.id }</p>
          <div className='bg-teal-300 rounded-xl border-white border-2 text-sm p-0.5 shadow-sm'>
            <p className="text-white text-shadow-sm">50 / 50</p>
          </div>
        </div>
      </div>
      {/* 操作界面 */}
      <div className='flex-1 p-5'>
        <div className='relative w-full h-full bg-white rounded-xl shadow-xl'>
          <AnimatePresence>
            <motion.div
              key={status}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className='absolute w-full h-full p-3'
            >
              <ComponentToRender/>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
      {/* 我方信息 */}
      <div className='px-10 flex items-center space-x-2'>
        <div className='w-15 h-15 bg-white rounded-full shadow-sm border-2 border-white'></div>
        <div className='flex-1 space-y-1 text-center'>
          <p className="text-white text-shadow-sm">{ player?.id }</p>
          <div className='bg-teal-300 rounded-xl border-white border-2 text-sm p-0.5 shadow-sm'>
            <p className="text-white text-shadow-sm">50 / 50</p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Game
