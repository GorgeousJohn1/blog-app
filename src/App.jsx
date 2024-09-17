import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import PostsList from './features/posts/PostsList';
import SinglePostPage from './features/posts/SinglePostPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="articles">
          <Route index element={<PostsList />} />
          <Route path=":slug" element={<SinglePostPage />} />
        </Route>
        <Route path="*" element={<Navigate to="articles" replace />} />
        <Route path="" element={<Navigate to="articles" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
