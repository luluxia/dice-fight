import { useState } from 'react'
import { useStore } from '../store'
import Button from '../components/Button'

function Help() {
  const { changePage } = useStore(store => ({ changePage: store.changePage }))
  const [state, setState] = useState({
    selected: 0,
    menu: ['游戏规则', '更新日志', '制作名单']
  })

  return (
    <div className='h-full flex flex-col max-w-screen-sm m-auto p-2'>
      <div className='relative w-full h-full bg-white rounded-xl shadow-xl p-3 space-y-2 flex flex-col'>
        {/* 标题 */}
        <p className="text-center font-bold text-sky-400">帮助</p>
        <div className="bg-sky-50 flex mx-auto space-x-2 rounded-full border-2 border-sky-400">
          {
            state.menu.map((item, index) => (
              <p
                key={index}
                className={`px-4 py-1 rounded-full text-sky-400 cursor-pointer transition-colors ${state.selected === index ? 'bg-sky-400 text-white' : ''}`}
                onClick={() => setState({ ...state, selected: index })}
              >
                {item}
              </p>
            ))
          }
        </div>
        <div className="flex-1 border-3 border-dashed border-sky-200 rounded-xl p-3 overflow-y-auto overscroll-contain">
          {
            state.selected === 0 &&
            <div className='text-dark-100'>
              <p className='text-sky-400 bg-sky-50 font-bold my-1 px-2 py-1 rounded'>介绍</p>
              <p>《骰子大作战》是一款通过骰子来进行战斗的双人回合制对战游戏。</p>
              <p className='text-sky-400 bg-sky-50 font-bold my-1 px-2 py-1 rounded'>如何开始游戏</p>
              <p>在
                <span className='text-sky-400'>备战</span>
                中选择3枚角色骰子，创建多人游戏房间，复制邀请链接邀请好友加入，或点击好友发送的邀请链接加入游戏。
              </p>
              <p className='text-sky-400 bg-sky-50 font-bold my-1 px-2 py-1 rounded'>骰子类型</p>
              <p>骰子分为<span className='text-sky-400'>点数骰子</span>与<span className='text-sky-400'>角色骰子</span>。</p>
              <p>点数骰子为1~6点。</p>
              <p>角色骰子有不同的骰面 ，骰面会分为
                <span className='text-sky-400'>固定行动</span>、
                <span className='text-sky-400'>无点数行动</span>
                以及
                <span className='text-sky-400'>无效行动</span>
                。
              </p>
              <p>
                <span className='text-sky-400'>固定行动</span>
                ：打出骰子即可造成对应点数的效果，无法被加成。
              </p>
              <p>
                <span className='text-sky-400'>无点数行动</span>
                ：无法直接打出，需要配合点数骰子，可以被点数骰子加成。
              </p>
              <p>
                <span className='text-sky-400'>无效行动</span>
                ：无法打出，等同攻击落空。
              </p>
              <p className='text-sky-400 bg-sky-50 font-bold my-1 px-2 py-1 rounded'>回合流程</p>
              <p>游戏回合前，双方将各自投掷1枚点数骰子，以决定先后手。</p>
              <p>每回合，玩家将投掷3枚点数骰子和3枚角色骰子，共有3次投掷机会。</p>
              <p>点击骰子，可以放入行动栏。</p>
              <p>放入行动栏内的骰子符合行动要求时，可以被打出消耗。</p>
              <p>行动栏内的骰子将不受投掷影响。</p>
              <p>当双方玩家任一血量归零时，游戏结束。</p>
              <p className='text-sky-400 bg-sky-50 font-bold my-1 px-2 py-1 rounded'>角色骰子行动</p>
            </div>
          }
        </div>
        <Button onClick={() => changePage('index')} color="sky">返回</Button>
      </div>
    </div>
  )
}

export default Help
