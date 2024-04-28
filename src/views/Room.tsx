import { useEffect, useRef } from 'react'
import { insertCoin, usePlayersList, me, isHost, RPC } from 'playroomkit'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useStore } from '../store'
import Button from '../components/Button'

function Room() {
  const loading = useRef(true)
  const { changePage } = useStore()

  const players = usePlayersList()
  const player = players.find(p => p.id === me().id)
  const opponent = players.find(p => p.id !== me().id)

  useEffect(() => {
    insertCoin({
      skipLobby: true,
    }, () => {
      loading.current = false
      console.log('insertCoin success')
      console.log(`me: ${me().id}`)
    })
    RPC.register('changePage', async (page: string) => {
      changePage(page)
    })
  }, [])

  return (
    <div className="h-full flex flex-col max-w-screen-sm m-auto p-5">
      <div className="w-full h-full bg-white rounded-xl shadow-xl flex">
        <AnimatePresence>
          {
            loading.current ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="m-auto">加载中</motion.p>
            ) :
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className='w-full h-full p-3 space-y-2 flex flex-col'
              >
                {/* 标题 */}
                <p className="text-center font-bold text-sky-400">房间</p>
                {/* 对手 */}
                <div className="relative flex border-3 border-dashed border-sky-200 rounded-xl p-3 flex-1">
                  <p className='m-auto'>{opponent ? opponent.id : '等待对手加入房间'}</p>
                </div>
                <p className="text-center text-sky-400">VS</p>
                {/* 玩家 */}
                <div className="relative flex border-3 border-dashed border-sky-200 rounded-xl p-3 flex-1">
                  <p className='m-auto'>{player ? player.id : '加载中'}</p>
                </div>
                {
                  isHost() &&
                  <p
                    className="text-center font-bold text-sky-400 cursor-pointer"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href)
                      toast('已复制邀请链接')
                    }}
                  >
                    复制邀请链接
                  </p>
                }
                {/* 选项 */}
                <div className="relative flex justify-center space-x-2">
                  <Button
                    className="flex-1"
                    color="sky"
                    disabled={!isHost() || !opponent}
                    onClick={() => {
                      RPC.call('changePage', 'game')
                    }}
                  >
                    {isHost() ? '开始游戏' : '等待房主开始游戏'}
                  </Button>
                  <Button color="rose" onClick={() => {
                    window.location.assign('/')
                  }}>退出房间</Button>
                </div>
              </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )
}

export default Room
