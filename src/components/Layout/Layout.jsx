import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import classes from './Layout.module.scss';

export default function Layout() {
  return (
    <>
      <Header />
      <main className={classes.App}>
        <Outlet />
      </main>
    </>
  );
}
