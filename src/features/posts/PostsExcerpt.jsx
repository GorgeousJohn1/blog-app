/* eslint-disable jsx-a11y/control-has-associated-label */
import PropTypes from 'prop-types';
import { Tag, message } from 'antd';
import { Link } from 'react-router-dom';
import { nanoid } from '@reduxjs/toolkit';
import { useLikePostMutation, useUnLikePostMutation } from '../api/apiSlice';
import classes from './PostsExcerpt.module.scss';
import Author from '../../components/Author/Author';

export default function PostsExcerpt({ post = {} }) {
  const {
    slug,
    title,
    description,
    createdAt,
    favorited,
    favoritesCount,
    author,
    tagList = [],
  } = post;

  const [likePost] = useLikePostMutation();
  const [unLikePost] = useUnLikePostMutation();

  let tags;
  if (tagList && tagList.length) {
    tags = tagList.map((item) => <Tag key={nanoid()}>{item}</Tag>);
  }

  const onFavorite = async () => {
    try {
      if (favorited) await unLikePost(slug).unwrap();
      else await likePost(slug).unwrap();
    } catch {
      message.warning('Something went wrong!');
    }
  };

  return (
    <article className={classes.post}>
      <div className={classes.post__content}>
        <div className={classes.post__header}>
          <Link to={post.slug}>
            <h2 className={classes.post__title}>{title}</h2>
          </Link>

          <button
            className={classes.favorite}
            type="button"
            onClick={onFavorite}
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
        <div className={classes.tags}>{tags}</div>
        <p className={classes.post__body}>
          {description.length > 140
            ? `${description.substr(0, 140)} ...`
            : description}
        </p>
      </div>
      <Author author={author} createdAt={createdAt} />
    </article>
  );
}

PostsExcerpt.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    body: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    createdAt: PropTypes.string,
    updatedAt: PropTypes.string,
    favorited: PropTypes.bool,
    favoritesCount: PropTypes.number,
    author: PropTypes.shape({
      username: PropTypes.string,
      bio: PropTypes.string,
      image: PropTypes.string,
      following: PropTypes.bool,
    }),
  }),
};
