import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { useStore } from '../store'

function Index() {
  const [menu, setMenu] = useState('index')
  const { changePage, charList, loadCharList } = useStore()

  const menuList: {
    [key: string]: {
      text: string
      color: string
      size: number
      action?: () => void
    }[]
  } = {
    'index': [
      { text: '单人游戏', color: 'rose', size: 2, action: () => toast.error('暂未开放') },
      {
        text: '多人游戏', color: 'orange', size: 2, action: () => {
          if (charList.includes(-1)) {
            toast.error('完成备战后才能进行多人游戏')
            return
          }
          setMenu('multiplayer')
        }
      },
      { text: '备战', color: 'lime', size: 2, action: () => changePage('prepare') },
      { text: '设置', color: 'sky', size: 1, action: () => toast.error('暂未开放') },
      { text: '帮助', color: 'sky', size: 1, action: () => toast.error('暂未开放') },
    ],
    'multiplayer': [
      { text: '创建房间', color: 'rose', size: 2, action: () => changePage('room') },
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
    if (document.location.hash.startsWith('#r=')) {
      changePage('room')
    }
  }, [])

  return (
    <div className="relative max-w-screen-sm h-full m-auto">
      <div className="flex flex-col justify-center items-center w-full h-[calc(100%-10rem)] space-y-2">
        <motion.img
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className='w-80 drop-shadow-2xl'
          src="./img/logo.svg" alt=""
        />
      </div>
      {/* 菜单 */}
      <AnimatePresence initial={false}>
        <motion.div
          key={menu}
          initial="hidden"
          animate="visible"
          // exit={{ opacity: 0 }}
          variants={listVariants}
          className="grid grid-cols-4 gap-2 absolute w-full p-5 pb-10 bottom-0"
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
      <p className='absolute w-full text-center py-2.5 text-sm text-white bottom-0'>© 2024 陆陆侠. v0.1.0</p>
    </div>
  )
}

export default Index
