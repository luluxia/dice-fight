import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import { useStore } from '../store'

function Index() {
  const [menu, setMenu] = useState('index')
  const { changePage, loadCharList } = useStore()

  const menuList: {
    [key: string]: {
      text: string
      color: string
      size: number
      action?: () => void
    }[]
  } = {
    'index': [
      { text: '单人游戏', color: 'rose', size: 2 },
      { text: '多人游戏', color: 'orange', size: 2, action: () => setMenu('multiplayer') },
      { text: '备战', color: 'lime', size: 2, action: () => changePage('prepare') },
      { text: '设置', color: 'sky', size: 1 },
      { text: '关于', color: 'sky', size: 1 },
    ],
    'multiplayer': [
      { text: '创建房间', color: 'rose', size: 2, action: () => changePage('game') },
      { text: '返回', color: 'sky', size: 2, action: () => setMenu('index') },
    ],
  }

  const listVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
    hidden: {
      opacity: 0,
    },
  }

  const itemVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -50 },
  }

  useEffect(() => {
    loadCharList()
  }, [])

  return (
    <div className="relative flex max-w-screen-sm h-full m-auto">
      <div className="flex m-auto">
        <div className="m-auto text-white font-bold text-6xl text-shadow-xl">
          <p>代号：</p>
          <p>骰子大对决</p>
        </div>
      </div>
      {/* 菜单 */}
      <AnimatePresence initial={false}>
        <motion.div
          key={Math.random()}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0 }}
          variants={listVariants}
          className="grid grid-cols-4 gap-2 absolute w-full p-5 bottom-0"
        >
          {
            menuList[menu].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onClick={() => {
                  if (item.action) {
                    item.action()
                  }
                }}
                className={classNames(
                  'pattern-diagonal-stripes-sm text-white/15 py-6 border-4 border-white rounded-xl shadow-xl cursor-pointer',
                  `!bg-${item.color}-200`,
                  `col-span-${item.size}`
                )}
              >
                <p className={classNames(
                  'text-xl font-bold tracking-widest text-center',
                  `text-${item.color}-500`
                )}>{item.text}</p>
              </motion.div>
            ))
          }
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default Index
