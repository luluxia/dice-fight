import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useStore } from './store'
import Index from './views/Index'
import Room from './views/Room'
import Prepare from './views/Prepare'
import Game from './views/Game'
import Help from './views/Help'

const pages: {
  [key: string]: React.FC
} = {
  index: Index,
  room: Room,
  prepare: Prepare,
  game: Game,
  help: Help,
}

function App() {
  const { page, pageKey } = useStore()
  const ComponentToRender = pages[page]

  return (
    <>
      {/* 背景 */}
      <div className="pattern-cross-dots-lg bg-sky-400 text-white/15 fixed w-screen h-screen -z-1"></div>
      {/* 提示 */}
      <Toaster />
      {/* 页面 */}
      <AnimatePresence>
        <motion.div
          key={pageKey}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className='absolute w-full h-full'
        >
          <ComponentToRender />
        </motion.div>
      </AnimatePresence>
    </>
  )
}

export default App
