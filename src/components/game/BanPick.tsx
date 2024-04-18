import Tippy from '@tippyjs/react'

function BanPick() {
  return (
    <div className='w-full h-full flex flex-col space-y-3'>
      <p className="text-center font-bold text-sky-400">禁用阶段</p>
      <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">对方阵容</p>
        <div className="flex flex-1 flex-col justify-center items-center space-y-4">
          <div className="flex space-x-4">
            <Tippy
              content={
                <div
                  className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
                >
                  <p className='font-bold text-sky-400 text-center'>弓箭手</p>
                  <div className='flex space-x-2'>
                    <div className='relative w-15 h-15 rounded bg-rose-400'>
                      <img className='absolute p-2' src="/img/action/sword.png" alt="" />
                      <span className='absolute text-2xl font-bold text-white text-shadow bottom-0 right-1.5'>3</span>
                    </div>
                    <div className='w-15 h-15 rounded p-0.5 bg-sky-500'></div>
                    <div className='w-15 h-15 rounded p-0.5 bg-sky-500'></div>
                  </div>
                  <div className='flex space-x-2'>
                    <div className='w-15 h-15 rounded p-0.5 bg-sky-500'></div>
                    <div className='w-15 h-15 rounded p-0.5 bg-sky-500'></div>
                    <div className='w-15 h-15 rounded p-0.5 bg-sky-500'></div>
                  </div>
                </div>
              }
              arrow={false}
              trigger='click'
            >
              <div className='w-15 h-15 rounded shadow p-0.5 bg-rose-500 ring-2 ring-offset-3 ring-sky-400'>
                <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_01.png`} alt="" />
              </div>
            </Tippy>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-sky-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_02.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-green-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_03.png`} alt="" />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className='w-15 h-15 rounded shadow p-0.5 bg-purple-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_04.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-gradient-to-br from-sky-500 to-green-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_06.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-gradient-to-br from-sky-500 to-purple-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_04.png`} alt="" />
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sky-400">禁用对方的一枚角色骰子</p>
      <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
        <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">我方阵容</p>
        <div className="flex flex-1 flex-col justify-center items-center space-y-4">
          <div className="flex space-x-4">
            <div className='w-15 h-15 rounded shadow p-0.5 bg-rose-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_01.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-sky-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_02.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-green-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_03.png`} alt="" />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className='w-15 h-15 rounded shadow p-0.5 bg-purple-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_04.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-gradient-to-br from-sky-500 to-green-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_06.png`} alt="" />
            </div>
            <div className='w-15 h-15 rounded shadow p-0.5 bg-gradient-to-br from-sky-500 to-purple-500'>
              <img className="w-full h-full rounded image-render-pixel p-1 bg-white/50" src={`./img/char/char_04.png`} alt="" />
            </div>
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
