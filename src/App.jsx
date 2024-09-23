import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { updateUserCredentials } from './features/users/userSlice';
import { useGetCurrentUserQuery } from './features/api/apiSlice';
import Layout from './components/Layout/Layout';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';
import SignIn from './features/users/SignIn';
import SignUp from './features/users/SignUp';
import Profile from './features/users/EditProfile';
import PostForm from './features/posts/PostForm';
import PrivateRoute from './hoc/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, data: userData } = useGetCurrentUserQuery();
  const profile = userData?.user;

  useEffect(() => {
    if (isSuccess) dispatch(updateUserCredentials(profile));
  }, [dispatch, profile, isSuccess]);

  return isLoading ? (
    <Spin fullscreen />
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles">
          <Route index element={<PostsList />} />
          <Route path=":slug" element={<SinglePostPage />} />
          <Route element={<PrivateRoute />}>
            <Route path=":slug/edit" element={<PostForm />} />
          </Route>
        </Route>
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="profile" element={<Profile />} />
          <Route path="new-article" element={<PostForm />} />
        </Route>

        <Route path="*" element={<Navigate to="articles" replace />} />
        <Route path="" element={<Navigate to="articles" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
