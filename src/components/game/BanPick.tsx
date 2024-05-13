// import { useEffect, useState } from 'react'
// import Tippy from '@tippyjs/react'
// import { RPC } from 'playroomkit'
// import { useStore, useGameStore } from '../../store'
// import { chars } from '../../data'
// import ActionDice from '../dice/ActionDice'
// import Button from '../Button'
// import classNames from 'classnames'

// interface PlayerState {
//   charList: number[]
//   banIndex: number
// }

// function BanPick() {
//   const { charList } = useStore()
//   const { round, changeRound } = useGameStore()

//   const [selectIndex, setSelectIndex] = useState<number>(-1)

//   const [opponentState, setOpponentState] = useState<PlayerState>({
//     charList: [],
//     banIndex: -1,
//   })
//   const [playerState, setPlayerState] = useState<PlayerState>({
//     charList: charList,
//     banIndex: -1,
//   })

//   useEffect(() => {
//     setPlayerState(playerState => ({
//       ...playerState,
//       charList,
//     }))
//     RPC.register('charList', async (charList: number[]) => {
//       setOpponentState(opponentState => ({
//         ...opponentState,
//         charList,
//       }))
//     })
//     RPC.register('banIndex', async (banIndex: number) => {
//       setPlayerState(playerState => ({
//         ...playerState,
//         banIndex,
//       }))
//       changeRound('player')
//     })
//     RPC.call('charList', charList, RPC.Mode.OTHERS)
//   }, [])

//   return (
//     <div className='w-full h-full flex flex-col space-y-3'>
//       {/* 标题 */}
//       <p className="text-center font-bold text-sky-400">禁用阶段</p>
//       {/* 对方阵容 */}
//       <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
//         <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">对方阵容</p>
//         <div className="flex flex-1 flex-col justify-center items-center space-y-4">
//           <div className="grid grid-cols-6 gap-2 <sm:grid-cols-3">
//             {
//               opponentState.charList.map((id, index) => (
//                 <Tippy
//                   key={id}
//                   content={
//                     <div
//                       className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
//                     >
//                       <p className='font-bold text-sky-400 text-center'>{chars[id].name}</p>
//                       <div className='grid grid-cols-3 gap-2'>
//                         {
//                           Array(6).fill(0).map((_, index) => (
//                             <ActionDice char={chars[id]} action={index} />
//                           ))
//                         }
//                       </div>
//                     </div>
//                   }
//                   arrow={false}
//                   hideOnClick={false}
//                 >
//                   <div
//                     className={classNames(
//                       `w-15 h-15 rounded p-0.5 shadow cursor-pointer ${chars[id].background} transition-all`,
//                       selectIndex === index && 'ring-2 ring-offset-2 ring-sky-400',
//                       opponentState.banIndex === index && 'opacity-50'
//                     )}
//                     onClick={() => {
//                       if (round === 'player') {
//                         setSelectIndex(index)
//                       }
//                     }}
//                   >
//                     <img
//                       className="w-full h-full rounded image-render-pixel p-1 bg-white/50"
//                       src={`./img/char/${chars[id].pic}.png`} alt=""
//                     />
//                   </div>
//                 </Tippy>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//       {/* 提示 */}
//       <p className="text-center text-sky-400">
//         {
//           round === 'player' ? '禁用对方的一枚角色骰子' : '等待对方禁用我方的一枚角色骰子'
//         }
//       </p>
//       {/* 我方阵容 */}
//       <div className="relative flex flex-1 border-3 border-dashed border-sky-200 rounded-xl">
//         <p className="absolute -top-3 left-4 bg-white text-sky-400 px-1 text-sm">我方阵容</p>
//         <div className="flex flex-1 flex-col justify-center items-center space-y-4">
//           <div className="grid grid-cols-6 gap-2 <sm:grid-cols-3">
//             {
//               playerState.charList.map((id, index) => (
//                 <Tippy
//                   key={id}
//                   content={
//                     <div
//                       className='bg-white rounded p-2 border-2 border-sky-400 shadow-xl space-y-2'
//                     >
//                       <p className='font-bold text-sky-400 text-center'>{chars[id].name}</p>
//                       <div className='grid grid-cols-3 gap-2'>
//                         {
//                           Array(6).fill(0).map((_, index) => (
//                             <ActionDice char={chars[id]} action={index} />
//                           ))
//                         }
//                       </div>
//                     </div>
//                   }
//                   arrow={false}
//                   hideOnClick={false}
//                 >
//                   <div
//                     className={classNames(
//                       `w-15 h-15 rounded p-0.5 shadow cursor-pointer ${chars[id].background} transition-all`,
//                       playerState.banIndex === index && 'opacity-50'
//                     )}
//                   >
//                     <img
//                       className="w-full h-full rounded image-render-pixel p-1 bg-white/50"
//                       src={`./img/char/${chars[id].pic}.png`} alt=""
//                     />
//                   </div>
//                 </Tippy>
//               ))
//             }
//           </div>
//         </div>
//       </div>
//       {/* 选项 */}
//       <Button
//         color="sky"
//         disabled={round !== 'player'}
//         onClick={() => {
//           if (selectIndex !== -1) {
//             RPC.call('banIndex', selectIndex, RPC.Mode.OTHERS)
//             setOpponentState(opponentState => ({
//               ...opponentState,
//               banIndex: selectIndex,
//             }))
//             setSelectIndex(-1)
//             changeRound('opponent')
//           }
//         }}
//       >禁用</Button>
//     </div>
//   )
// }

// export default BanPick
