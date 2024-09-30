import s from '/src/pages/NotFoundPage/NotFoundPage.module.css'
import { TbError404 } from "react-icons/tb";

const NotFoundPage = () => {
  return (
    <div className={s.container}>
      <TbError404  className={s.error}/>
      <h1>Sorry, this page could not be found.</h1>
    </div>
  );
};

export default NotFoundPage;