import { Alert, Spin, Tag, Button, Popconfirm, message } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ReactMarkdown from 'react-markdown';
import { selectUser } from '../users/userSlice';

import {
  useGetSinglePostQuery,
  useDeletePostMutation,
  useLikePostMutation,
  useUnLikePostMutation,
} from '../api/apiSlice';

import Author from '../../components/Author/Author';
import classes from './SinglePost.module.scss';
import '../../../public/markdown.css';

export default function SinglePostPage() {
  const { slug } = useParams();
  const currentUser = useSelector(selectUser).username;
  const navigate = useNavigate();

  const {
    data: singlePost,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSinglePostQuery(slug);

  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();

  const onDeletePost = async () => {
    try {
      await deletePost(slug).unwrap();

      message.success('Your post was deleted successfully');
      navigate('/articles');
    } catch (err) {
      message.warning('Something went wrong!');
    }
  };

  const onFavorite = async (favorited) => {
    try {
      if (favorited) await unLikePost(slug).unwrap();
      else await likePost(slug).unwrap();
    } catch {
      message.warning('Something went wrong!');
    }
  };

  if (isLoading) return <Spin />;

  if (isError)
    return (
      <Alert
        style={{ width: '50%', alignSelf: 'center' }}
        type="error"
        message={error.status}
        description={error.error}
      />
    );

  if (isSuccess) {
    const {
      title,
      description,
      body,
      createdAt,
      favorited,
      favoritesCount,
      author,
      tagList,
    } = singlePost.article;

    const tags = tagList.map((item) => <Tag key={item}>{item}</Tag>);

    const editable = currentUser === author.username;

    return (
      <article className={classes.post}>
        <div className={classes.post__header}>
          <div className={classes['post__header-left']}>
            <h2 className={classes.post__title}>{title}</h2>

            <button
              className={classes.favorite}
              type="button"
              onClick={() => onFavorite(favorited)}
            >
              <svg
                width="20"
                height="16"
                viewBox="-5 -2 60 55"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M51.911,16.242C51.152,7.888,45.239,1.827,37.839,1.827c-4.93,0-9.444,2.653-11.984,6.905
  c-2.517-4.307-6.846-6.906-11.697-6.906c-7.399,0-13.313,6.061-14.071,14.415c-0.06,0.369-0.306,2.311,0.442,5.478
  c1.078,4.568,3.568,8.723,7.199,12.013l18.115,16.439l18.426-16.438c3.631-3.291,6.121-7.445,7.199-12.014
  C52.216,18.553,51.97,16.611,51.911,16.242z"
                  fill={favorited ? '#F5222D' : 'white'}
                  stroke={favorited ? '#F5222D' : 'black'}
                  strokeWidth="4"
                />
              </svg>
              <span>{favoritesCount}</span>
            </button>
          </div>
          <Author author={author} createdAt={createdAt} />
        </div>
        <div className={classes.tags}>{tags}</div>
        <div className={classes['with-description']}>
          <p className={classes.description}>{description}</p>
          {editable ? (
            <div className={classes.buttons}>
              <Popconfirm
                description="Are you sure to delete this article?"
                onConfirm={onDeletePost}
                onCancel={() => {}}
                okText="Yes"
                cancelText="No"
                placement="rightTop"
              >
                <Button danger size="large">
                  Delete
                </Button>
              </Popconfirm>
              <Button
                style={{
                  color: 'rgba(82, 196, 26, 1)',
                  borderColor: 'rgba(82, 196, 26, 1)',
                }}
                size="large"
                onClick={() => navigate(`/articles/${slug}/edit`)}
              >
                Edit
              </Button>
            </div>
          ) : null}
        </div>
        <ReactMarkdown className="markdown-body">{body}</ReactMarkdown>
      </article>
    );
  }
}
