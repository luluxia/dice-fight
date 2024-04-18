import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from './store'
import Index from './views/Index'
import Prepare from './views/Prepare'
import Game from './views/Game'

const pages: {
  [key: string]: React.FC
} = {
  index: Index,
  prepare: Prepare,
  game: Game,
}

function App() {
  const { page, pageKey } = useStore()
  const ComponentToRender = pages[page]

  return (
    <>
      {/* 背景 */}
      <div className="pattern-cross-dots-lg bg-sky-400 text-white/15 fixed w-screen h-screen -z-1"></div>
      <AnimatePresence initial={false}>
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
