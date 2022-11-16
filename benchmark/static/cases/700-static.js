import { prefix } from '../../packages/700'

export const static700 = () => {
  const styles = {
    color: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: '12px',
    appearance: 'none',
    ':hover': {
      alignSelf: 'flex-start',
      transition: '300ms transform linear',
      transform: 'rotateX(30deg)',
      color: 'blue',
      width: ['calc(100% - 50px)', '300px'],
    },
  }

  const prefixed = prefix(styles)
  return prefixed
}
