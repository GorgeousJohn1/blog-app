import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { selectUser, userLoggedOut } from '../../features/users/userSlice';
import Author from '../Author/Author';
import classes from './Header.module.scss';

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const logOut = () => {
    localStorage.removeItem('token');
    dispatch(userLoggedOut());
    navigate('/articles');
  };

  return (
    <header className={classes.Header}>
      <Link to="/" className={classes.Header__title}>
        Realworld Blog
      </Link>
      <div className={classes.Header__links}>
        {user.username ? (
          <>
            <Link
              to="new-article"
              className={classes['Header__links--new-article']}
            >
              Create article
            </Link>
            <Link to="profile">
              <Author author={user} />
            </Link>
            <button type="button" onClick={logOut}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link
              to="sign-in"
              className={classes['Header__links--signIn-link']}
            >
              Sign In
            </Link>
            <Link
              to="sign-up"
              className={classes['Header__links--signUp-link']}
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
