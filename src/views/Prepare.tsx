
import { useStore } from '../store'
import Tippy from '@tippyjs/react'
import { hideAll } from 'tippy.js'
import classNames from 'classnames'
import { motion, AnimatePresence } from 'framer-motion'
import { chars } from '../data'

function Prepare() {
  const { charList, setCharList, removeCharList, changePage } = useStore()

  return (
    <div className='h-full flex flex-col max-w-screen-sm m-auto p-5'>
      {/* 操作界面 */}
      <div className='relative w-full h-full bg-white rounded-xl shadow-xl p-3 space-y-2 flex flex-col'>
        {/* 标题 */}
        <p className="text-center font-bold text-sky-400">备战</p>
        {/* 队伍 */}
        <div className="relative flex border-3 border-dashed border-sky-200 rounded-xl p-3">
          <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">队伍</p>
          <div className="flex flex-1 flex-col justify-center items-center space-y-4">
            <div className="grid grid-cols-6 gap-2 <sm:grid-cols-3">
              {
                charList.map((id, index) => (
                  <div key={index} className='w-15 h-15'>
                    <AnimatePresence>
                      {
                        id === -1 ?
                          <div className='w-15 h-15 rounded border-2 border-gray-300 border-dashed'></div> :
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => { removeCharList(id) }}
                            className={`absolute w-15 h-15 rounded p-0.5 shadow cursor-pointer ${chars[id].background}`}
                          >
                            {
                              id !== -1 &&
                              <img
                                className="w-full h-full rounded image-render-pixel p-1 bg-white/50"
                                src={`./img/char/${chars[id].pic}.png`} alt=""
                              />
                            }
                          </motion.div>
                      }
                    </AnimatePresence>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
        {/* 说明 */}
        <p className="text-center text-sky-400">选取 6 名角色加入队伍</p>
        {/* 角色 */}
        <div className="relative flex flex-1 min-h-0 border-3 border-dashed border-sky-200 rounded-xl py-3">
          <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">角色</p>
          <div onScroll={() => hideAll()} className="w-full h-full px-3 overflow-y-auto">
            {
              chars.map((char, index) => (
                <div
                  key={index}
                  className={
                    classNames(
                      'flex flex-col items-center py-2 w-full h-max space-y-2',
                      index !== chars.length - 1 && 'border-b-2 border-sky-200 border-dashed'
                    )
                  }
                >
                  <div className="flex w-full items-center space-x-2">
                    <img className="w-12 h-12 rounded image-render-pixel bg-white/50" src={`./img/char/${char.pic}.png`} alt="" />
                    <div className="flex-1 flex-col justify-center">
                      <p className="text-sky-400 font-bold">{char.name}</p>
                      <p className="text-dark-100 text-sm">{char.desc}</p>
                    </div>
                    <div
                      onClick={() => {
                        if (charList.includes(index)) {
                          removeCharList(index)
                        } else if (charList.includes(-1)) {
                          setCharList(index)
                        }
                      }}
                      className={classNames(
                        'px-4 text-center py-2 rounded-3xl text-white text-shadow-sm shadow-sm transition-colors cursor-pointer',
                        charList.includes(index) ? 'bg-rose-400' : charList.includes(-1) ? 'bg-sky-400' : 'bg-gray-400'
                      )}>
                      {
                        charList.includes(index) ? '换下' : '加入'
                      }
                    </div>
                  </div>
                  <div className='grid grid-cols-6 gap-2 <sm:grid-cols-3'>
                    {
                      char.actions.map((action, index) => (
                        <Tippy
                          content={
                            <div className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl'>
                              <p className='text-sky-400 font-bold'>{action.name}</p>
                              <p className='text-dark-100'>{action.desc}</p>
                            </div>
                          }
                          appendTo='parent'
                          key={index}
                        >
                          <div className={`relative w-15 h-15 rounded flex ${action.background}`}>
                            <img
                              className='w-full h-full rounded image-render-pixel p-2 opacity-25'
                              src={`./img/char/${char.pic}.png`} alt=""
                            />
                            {
                              action.pic &&
                              <img className='absolute p-2' src={`/img/action/${action.pic}.png`} alt="" />
                            }
                            {
                              action.value &&
                              <span className='absolute text-2xl font-bold text-white text-shadow bottom-0 right-1.5'>{action.value}</span>
                            }
                          </div>
                        </Tippy>
                      ))
                    }
                  </div>
                </div>
              ))
            }
          </div>

        </div>
        {/* 选项 */}
        <div
          onClick={() => changePage('index')}
          className="text-center bg-sky-400 py-2 rounded-3xl text-white text-shadow-sm shadow-sm cursor-pointer">
          返回
        </div>
      </div>
    </div>
  )
}

export default Prepare
