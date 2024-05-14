import { useEffect, useState } from 'react'
import { insertCoin, me, onPlayerJoin, getRoomCode } from 'playroomkit'
import { RPC } from '../tools'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { useStore, useGameStore, usePlayerStore, useOpponentStore } from '../store'
import Button from '../components/Button'
import classNames from 'classnames'

function Room() {
  const [loading, setLoading] = useState(true)
  const { charList, changePage } = useStore()
  const { changeStatus } = useGameStore()

  const player = usePlayerStore()
  const opponent = useOpponentStore()

  useEffect(() => {
    player.set('nick', localStorage.getItem('nick') || '')
    if (charList.includes(-1)) {
      toast.error('完成备战后才能进行多人游戏')
      document.location.hash = ''
      changePage('index')
      return
    }
    insertCoin({
      skipLobby: true,
      maxPlayersPerRoom: 2,
    }, () => {
      console.log('insertCoin success')
      console.log(`me: ${me().id}`)
      player.set('id', me().id)
      player.set('charList', charList)
      onPlayerJoin((playerState) => {
        const player = usePlayerStore.getState()
        const opponent = useOpponentStore.getState()
        RPC.call('setPlayer', { id: me().id, nick: player.nick, charList, ready: player.ready }, RPC.Mode.OTHERS)
        // 对手退出时重回房间并重置游戏状态
        if (playerState.id !== me().id) {
          playerState.onQuit(() => {
            const page = useStore.getState().page
            opponent.set('id', '')
            opponent.set('ready', false)
            if (page !== 'room') {
              toast.error('对手离开了游戏')
              player.reset()
              opponent.reset()
              changeStatus('round-order')
              changePage('room')
            }
          })
        }
      })
    }, (error) => {
      if (error.message === 'ROOM_LIMIT_EXCEEDED') {
        toast.error('房间已满')
        document.location.hash = ''
        changePage('index')
      }
    })
    RPC.register('changePage', async (page: string) => {
      changePage(page)
    })
    RPC.register('setPlayer', async (data) => {
      Object.keys(data).forEach(k => {
        opponent.set(k, data[k])
      })
    })
    RPC.register('setOpponent', async (data) => {
      Object.keys(data).forEach(k => {
        player.set(k, data[k])
      })
    })
  }, [])

  useEffect(() => {
    if (player.id) {
      setLoading(false)
    }
  }, [player.id])

  // 双方准备完毕，开始游戏
  useEffect(() => {
    if (player.ready && opponent.ready) {
      changePage('game')
      changeStatus('round-order')
      player.set('ready', false)
      opponent.set('ready', false)
    }
  }, [player.ready, opponent.ready])

  return (
    <div className="h-full flex flex-col max-w-screen-sm m-auto p-5">
      <div className="w-full h-full bg-white rounded-xl shadow-xl flex">
        <AnimatePresence>
          {
            loading ? (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="m-auto">加载中</motion.p>
            ) :
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className='w-full h-full p-3 space-y-2 flex flex-col'
              >
                {/* 标题 */}
                <p className="text-center font-bold text-sky-400">房间 {getRoomCode()}</p>
                {/* 对手 */}
                <div className="relative flex border-3 border-dashed border-sky-200 rounded-xl p-3 flex-1">
                  {
                    opponent.id ?
                      <div className='m-auto flex flex-col justify-center items-center space-y-3'>
                        <div
                          className='w-20 h-20 rounded-full border-2 border-sky-300 p-1 pattern-diagonal-stripes-sm !bg-sky-100 text-sky-200'
                        >
                          <img src="./img/avatar/0.png" alt="" />
                        </div>
                        <p className='text-sky-400 font-bold'>{opponent.nick}</p>
                        <p className={
                          classNames(
                            'px-3 py-1 rounded-2xl text-white text-sm text-shadow-sm transition-colors',
                            opponent.ready ? 'bg-sky-400' : 'bg-gray-400'
                          )
                        }>
                          {opponent.ready ? '已准备' : '未准备'}
                        </p>
                      </div> :
                      <p className='m-auto'>等待对手加入房间</p>
                  }
                </div>
                <p className="text-center text-sky-400">VS</p>
                {/* 玩家 */}
                <div className="relative flex border-3 border-dashed border-sky-200 rounded-xl p-3 flex-1">
                  {
                    player.id ?
                      <div className='m-auto flex flex-col justify-center items-center space-y-3'>
                        <div
                          className='w-20 h-20 rounded-full border-2 border-sky-300 p-1 pattern-diagonal-stripes-sm !bg-sky-100 text-sky-200'
                        >
                          <img src="./img/avatar/0.png" alt="" />
                        </div>
                        <input
                          className='text-sky-400 font-bold text-center bg-sky-100 border-2 border-sky-200 p-1 rounded-2xl w-40 outline-none'
                          type="text" value={player.nick}
                          maxLength={10}
                          onChange={e => {
                            player.set('nick', e.target.value)
                            RPC.call('setPlayer', { nick: e.target.value }, RPC.Mode.OTHERS)
                            localStorage.setItem('nick', e.target.value)
                          }}
                        />
                        <p className={
                          classNames(
                            'px-3 py-1 rounded-2xl text-white text-sm text-shadow-sm transition-colors',
                            player.ready ? 'bg-sky-400' : 'bg-gray-400'
                          )
                        }>
                          {player.ready ? '已准备' : '未准备'}
                        </p>
                      </div> :
                      <p className='m-auto'>加载中</p>
                  }
                </div>
                {
                  !opponent.id &&
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
                    onClick={() => {
                      player.set('ready', !player.ready)
                      RPC.call('setPlayer', { ready: !player.ready }, RPC.Mode.OTHERS)
                    }}
                  >
                    {!player.ready ? '准备' : '取消准备'}
                  </Button>
                  <Button color="rose" onClick={() => {
                    window.location.hash = ''
                    window.location.reload()
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
