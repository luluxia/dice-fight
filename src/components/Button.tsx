import classNames from 'classnames'

function Button(props: any) {
  return (
    <div
      className={classNames(
        'px-6 py-2 text-center rounded-3xl text-white text-shadow-sm shadow-sm cursor-pointer transition-all',
        `bg-${props.color}-400 hover:bg-${props.color}-300`,
        props.disabled && 'opacity-50 cursor-not-allowed',
        props.className
      )}
      onClick={() => {
        if (!props.disabled) {
          props.onClick()
        }
      }}
    >
      {props.children}
    </div>
  )
}

export default Button
