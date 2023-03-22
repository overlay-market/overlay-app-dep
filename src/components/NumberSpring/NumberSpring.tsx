import {useSpring, animated} from 'react-spring'

export default function NumberSpring(inputValue?: number, text?: string) {
  const props = useSpring({
    from: {value: 0},
    value: inputValue,
  })

  return (
    <>
      <animated.div>{props.value.interpolate(x => (x as number).toFixed(4))}</animated.div>
      &nbsp;
      {text}
    </>
  )
}
