import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGameStore, usePlayerStore, useOpponentStore } from '../store'
import { RPC } from '../tools'
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

const textMessages = [
  { title: '问候', content: '你好！' },
  { title: '赞扬', content: '打得不错！' },
  { title: '催促', content: '搞快点！' },
  { title: '挑衅', content: '我的魔法，会把你撕成碎片！' },
  { title: '邀请', content: '再来一把！' },
  { title: '道别', content: '再见！' },
  { title: '思考', content: '让我想想…' },
  { title: '稍等', content: '你先别急！' },
]

function Game() {
  const [showMessageList, setShowMessageList] = useState(false)
  const { status, title } = useGameStore()

  const player = usePlayerStore()
  const opponent = useOpponentStore()

  const ComponentToRender = components[status]

  useEffect(() => {
    RPC.register('setPlayerMessage', async (message: any) => {
      opponent.setMessage(message)
    })
  })

  return (
    <>
      {/* 交流列表 */}
      <AnimatePresence initial={false}>
        {
          showMessageList &&
          <motion.div
            key={'message-list'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed left-0 top-0 w-full h-full bg-black/40 z-1 flex justify-center items-end p-5'
            onClick={() => setShowMessageList(false)}
          >
            <div
              onClick={e => e.stopPropagation()}
              className={`
                max-w-screen-sm max-h-full bg-white p-3 rounded-xl
                space-y-2 flex flex-col shadow-sm
              `}
            >
              <p className='text-center font-bold text-sky-400'>交流</p>
              <div className='border-3 border-dashed border-sky-200 rounded-xl p-3 overflow-y-auto overscroll-contain'>
                <div className='grid grid-cols-8 gap-1 <sm:grid-cols-4'>
                  {
                    textMessages.map((msg, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          player.setMessage({ type: 'text', id: i })
                          RPC.call('setPlayerMessage', { type: 'text', id: i }, RPC.Mode.OTHERS)
                          setShowMessageList(false)
                        }}
                        className='cursor-pointer rounded p-1 transition-colors hover:bg-black/5'
                      >
                        <p className='text-center font-bold text-sky-400 p-2 bg-sky-50 rounded-xl'>{msg.title}</p>
                      </div>
                    ))
                  }
                  {
                    Array.from({ length: 16 }).map((_, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          player.setMessage({ type: 'emoji', id: i })
                          RPC.call('setPlayerMessage', { type: 'emoji', id: i }, RPC.Mode.OTHERS)
                          setShowMessageList(false)
                        }}
                        className='cursor-pointer rounded p-1 transition-colors hover:bg-black/5'
                      >
                        <img
                          className='w-full'
                          src={`./img/emoji/${i}.svg`} alt=""
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </motion.div>
        }
      </AnimatePresence>
      {/* 对局提示 */}
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
        <div className='relative px-5 flex justify-center items-center'>
          <AnimatePresence>
            {
              opponent.message.id !== -1 &&
              <motion.div
                key={opponent.message.key}
                className='absolute left-2 min-w-21 top-18 bg-sky-400 p-2 rounded-xl border-2 border-white shadow z-1'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {
                  opponent.message.type === 'text' &&
                  <p className='text-white text-shadow-sm'>
                    {textMessages[opponent.message.id].content}
                  </p>
                }
                {
                  opponent.message.type === 'emoji' &&
                  <img
                    className='w-15 h-15 m-auto'
                    src={`./img/emoji/${opponent.message.id}.svg`} alt=""
                  />
                }
              </motion.div>
            }
          </AnimatePresence>
          <div
            className={`
              w-15 h-15 rounded-full shadow-sm border-2 border-sky-200
              pattern-diagonal-stripes-sm !bg-sky-50 text-sky-100 overflow-hidden mr-3
            `}
          >
            <img src={`./img/avatar/${opponent.avatar}.png`} alt="" />
          </div>
          <div className='flex-1 space-y-1 text-center'>
            <p className="text-white text-shadow-sm">{opponent.nick}</p>
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
        <div className='relative px-5 flex justify-center items-center'>
          <AnimatePresence>
            {
              player.message.id !== -1 &&
              <motion.div
                key={player.message.key}
                className='absolute left-2 min-w-21 bottom-18 bg-sky-400 p-2 rounded-xl border-2 border-white shadow'
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                {
                  player.message.type === 'text' &&
                  <p className='text-white text-shadow-sm'>
                    {textMessages[player.message.id].content}
                  </p>
                }
                {
                  player.message.type === 'emoji' &&
                  <img
                    className='w-15 h-15 m-auto'
                    src={`./img/emoji/${player.message.id}.svg`} alt=""
                  />
                }
              </motion.div>
            }
          </AnimatePresence>
          <div
            onClick={() => setShowMessageList(true)}
            className={`
              w-15 h-15 rounded-full shadow-sm border-2 border-sky-200
              pattern-diagonal-stripes-sm !bg-sky-50 text-sky-100 overflow-hidden cursor-pointer mr-3
            `}
          >
            <img src={`./img/avatar/${player.avatar}.png`} alt="" />
          </div>
          <div className='flex-1 space-y-1 text-center'>
            <p className="text-white text-shadow-sm">{player.nick}</p>
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
