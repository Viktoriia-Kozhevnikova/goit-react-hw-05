import { RotatingLines } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css'

const Loader = () => {
  return (
    <div className={s.loader}>
      <RotatingLines
        visible={true}
        height='96'
        width='96'
        color='grey'
        strokeWidth='5'
        animationDuration='0.75'
        ariaLabel='rotating-lines-loading'
      />
    </div>
  );
};

export default Loader;