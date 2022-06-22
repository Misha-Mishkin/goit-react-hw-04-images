import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { Bars } from 'react-loader-spinner';
import s from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={s.Loader}>
      <Bars color="#3f51b5" height={50} width={50} ariaLabel="loading" />
    </div>
  );
}
