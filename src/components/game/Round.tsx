function Round() {
  return (
    <div className='w-full h-full flex flex-col space-y-2'>
      <p className="text-center font-bold text-sky-400">我方行动中</p>
      <div className="flex flex-wrap justify-center border-3 border-dashed border-sky-200 rounded-xl p-1">
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
        <div className="w-15 h-15 border-2 border-dark rounded m-1"></div>
      </div>
      <div className="text-center bg-orange-400 py-2 rounded-3xl text-white text-shadow-sm shadow-sm">
        攻击
      </div>
      <div className="flex-1 border-3 border-dashed border-sky-200 rounded-xl"></div>
      <div className="relative flex justify-center space-x-2">
        <div className="flex-1 text-center bg-sky-400 py-2 rounded-3xl text-white text-shadow-sm shadow-sm">
          投掷<span className="opacity-80 ml-2">剩余 3 次</span>
        </div>
        <div className="bg-rose-400 px-6 py-2 rounded-3xl text-white text-shadow-sm shadow-sm">
          结束回合
        </div>
      </div>
    </div>
  )
}

export default Round
