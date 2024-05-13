import { useStore, usePlayerStore, useOpponentStore } from '../../store'
import Button from '../Button'

function Result() {
  const { changePage } = useStore()
  const player = usePlayerStore()
  const opponent = useOpponentStore()

  return (
    <div className="w-full h-full flex flex-col space-y-2">
      <p className="text-center font-bold text-sky-400">
        游戏结束
      </p>
      <div className="flex-1 border-3 border-dashed border-sky-200 rounded-xl flex flex-col justify-center items-center">
        {
          player.hp < opponent.hp ?
            <p className='text-20 font-bold text-amber-400'>胜利</p> :
            <p className='text-20 font-bold text-gray-400'>落败</p>
        }
      </div>
      <div className="flex-1 border-3 border-dashed border-sky-200 rounded-xl flex flex-col justify-center items-center">
        {
          player.hp > opponent.hp ?
            <p className='text-20 font-bold text-amber-400'>胜利</p> :
            <p className='text-20 font-bold text-gray-400'>落败</p>
        }
      </div>
      <div className="flex space-x-2">
        <Button
          color="sky"
          className="flex-1"
          onClick={() => changePage('room')}
        >回到房间</Button>
        <Button
          color="rose"
          onClick={() => {
            window.location.hash = ''
            window.location.reload()
          }}
        >退出房间</Button>
      </div>
    </div>
  )
}

export default Result
