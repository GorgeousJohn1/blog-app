import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

export default function Header() {
  return (
    <header className={classes.Header}>
      <Link to="/" className={classes.Header__title}>
        Realworld Blog
      </Link>
      <div className={classes.Header__links}>
        <button className={classes['Header__links--signIn-link']} type="button">
          {' '}
          Sign In
        </button>
        <button className={classes['Header__links--signUp-link']} type="button">
          {' '}
          Sign Up
        </button>
      </div>
    </header>
  );
}
