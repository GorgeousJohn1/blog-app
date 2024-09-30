import { Alert, List } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { useGetPostsQuery } from '../api/apiSlice';

import PostsExcerpt from './PostsExcerpt';

export default function PostsList() {
  const [pageQuery, setPageQuery] = useSearchParams({ page: '1' });
  const { data, isSuccess, isLoading, isError, error } = useGetPostsQuery(
    Number(pageQuery.get('page'))
  );

  if (isError)
    return (
      <Alert
        style={{ width: '50%', alignSelf: 'center' }}
        type="error"
        message={error.status}
        description={error.error}
      />
    );

  return (
    <List
      itemLayout="vertical"
      grid={{ column: 1 }}
      split={false}
      dataSource={isSuccess ? data.articles : []}
      loading={isLoading}
      pagination={{
        current: Number(pageQuery.get('page')),
        align: 'center',
        pageSize: 5,
        showSizeChanger: false,
        total: isSuccess && data.articlesCount,
        onChange: (p) => {
          setPageQuery({ page: p.toString() });
        },
      }}
      renderItem={(item) => (
        <List.Item style={{ display: 'flex', justifyContent: 'center' }}>
          <PostsExcerpt key={`${item.slug}`} post={item} />
        </List.Item>
      )}
    />
  );
}
