import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import classNames from 'classnames'
import toast from 'react-hot-toast'
import { useStore } from '../store'
import Button from '../components/Button'

function Index() {
  const [roomCode, setRoomCode] = useState('')
  const [showJoinRoom, setShowJoinRoom] = useState(false)
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
      { text: '帮助', color: 'sky', size: 1, action: () => changePage('help') },
    ],
    'multiplayer': [
      { text: '创建房间', color: 'rose', size: 2, action: () => changePage('room') },
      { text: '加入房间', color: 'orange', size: 2, action: () => setShowJoinRoom(true) },
      { text: '返回', color: 'sky', size: 4, action: () => setMenu('index') },
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
      <AnimatePresence initial={false}>
        {
          showJoinRoom &&
          <motion.div
            key={'join-room'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed left-0 top-0 w-full h-full bg-black/50 z-1 flex'
            onClick={() => setShowJoinRoom(false)}
          >
            <div
              onClick={e => e.stopPropagation()}
              className='m-auto bg-white p-5 rounded-2xl border-3 border-sky-300 space-y-5 text-center'
            >
              <p className='font-bold text-sky-400 text-xl'>请输入房间号</p>
              <input
                className='text-sky-400 font-bold text-center bg-sky-100 border-2 border-sky-200 p-1 rounded-2xl w-40 outline-none'
                maxLength={4}
                value={roomCode}
                onChange={e => setRoomCode(e.target.value)}
              />
              <Button
                onClick={() => {
                  window.location.hash = `#r=R${roomCode.toLocaleUpperCase()}`
                  window.location.reload()
                }}
                color="sky"
              >加入</Button>
            </div>
          </motion.div>
        }
      </AnimatePresence>
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
          className="grid grid-cols-4 gap-2 absolute w-full p-2 pb-10 bottom-0"
        >
          {
            menuList[menu].map((item, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileTap={{ scale: 0.9 }}
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
