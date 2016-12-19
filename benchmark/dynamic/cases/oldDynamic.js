import Prefixer from '../../packages/205/Prefixer';

const CHROME45 = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.101 Safari/537.36';

export const oldDynamic = () => {
  const styles = {
    color: 'red',
    display: 'flex',
    justifyContent:'center',
    alignItems: 'center',
    userSelect: 'none',
    fontSize: '12px',
    appearance: 'none',
    ':hover': {
      alignSelf: 'flex-start',
      transition: '300ms transform linear',
      transform: 'rotateX(30deg)',
      color: 'blue',
      width: [ 'calc(100% - 50px)', '300px']
    }
  };

  const prefixer = new Prefixer({ userAgent: CHROME45 });
  return prefixer.prefix(styles);
};
