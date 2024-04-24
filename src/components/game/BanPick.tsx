import { useStore, useGameStore } from '../../store'
import Tippy from '@tippyjs/react'
import ActionDice from '../dice/ActionDice'

import { chars } from '../../data'

function BanPick() {
  const { charList } = useStore()
  const { round } = useGameStore()

  return (
    <div className='w-full h-full flex flex-col space-y-3'>
      <p className="text-center font-bold text-sky-400">禁用阶段</p>
      <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">对方阵容</p>
        <div className="flex flex-1 flex-col justify-center items-center space-y-4">
          <div className="grid grid-cols-6 gap-2 <sm:grid-cols-3">
            {
              charList.map(id => (
                <Tippy
                  key={id}
                  content={
                    <div
                      className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
                    >
                      <p className='font-bold text-sky-400 text-center'>{chars[id].name}</p>
                      <div className='grid grid-cols-3 gap-2'>
                        {
                          Array(6).fill(0).map((_, index) => (
                            <ActionDice char={chars[id]} action={index} />
                          ))
                        }
                      </div>
                    </div>
                  }
                  arrow={false}
                >
                  <div
                    className={`w-15 h-15 rounded p-0.5 shadow cursor-pointer ${chars[id].background}`}
                  >
                    <img
                      className="w-full h-full rounded image-render-pixel p-1 bg-white/50"
                      src={`./img/char/${chars[id].pic}.png`} alt=""
                    />
                  </div>
                </Tippy>
              ))
            }
          </div>
        </div>
      </div>
      <p className="text-center text-sky-400">
        {
          round === 'player' ? '禁用对方的一枚角色骰子' : '等待对方禁用我方的一枚角色骰子'
        }
      </p>
      <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">我方阵容</p>
        <div className="flex flex-1 flex-col justify-center items-center space-y-4">
          <div className="grid grid-cols-6 gap-2 <sm:grid-cols-3">
            {
              charList.map(id => (
                <div
                  key={id}
                  className={`w-15 h-15 rounded p-0.5 shadow cursor-pointer ${chars[id].background}`}
                >
                  <img
                    className="w-full h-full rounded image-render-pixel p-1 bg-white/50"
                    src={`./img/char/${chars[id].pic}.png`} alt=""
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div
        className="text-center bg-sky-400 py-2 rounded-3xl text-white text-shadow-sm shadow-sm cursor-pointer transition-colors hover:bg-sky-500"
      >
        禁用
      </div>
    </div>
  )
}

export default BanPick
