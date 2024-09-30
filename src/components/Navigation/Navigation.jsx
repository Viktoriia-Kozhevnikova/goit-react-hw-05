
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import s from '/src/components/Navigation/Navigation.module.css';

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <div className={s.container}>
      <NavLink className={buildLinkClass} to='/'>Home</NavLink>
      <NavLink className={buildLinkClass} to='/movies'>Movies</NavLink>
    </div>
  );
};

export default Navigation;