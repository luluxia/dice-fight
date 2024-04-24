import { forwardRef } from 'react'

const ActionDice = forwardRef((props: any, ref: any) => (
  <div ref={ref} className={`relative w-15 h-15 rounded flex ${props.char.actions[props.action].background}`}>
    <img
      className='w-full h-full rounded image-render-pixel p-2 opacity-25'
      src={`./img/char/${props.char.pic}.png`} alt=""
    />
    {
      props.char.actions[props.action].pic &&
      <img className='absolute p-2' src={`/img/action/${props.char.actions[props.action].pic}.png`} alt="" />
    }
    {
      props.char.actions[props.action].value &&
      <span className='absolute text-2xl font-bold text-white text-shadow bottom-0 right-1.5'>{props.char.actions[props.action].value}</span>
    }
  </div>
))

export default ActionDice
