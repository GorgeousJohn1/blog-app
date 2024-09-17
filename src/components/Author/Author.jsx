import { Image } from 'antd';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classes from './Author.module.scss';

export default function Author({ author = {}, createdAt = '' }) {
  const { username, image } = author;

  return (
    <div className={classes.author}>
      <div>
        <p className={classes.author__name}>{username}</p>
        <p className={classes.author__date}>
          {format(createdAt, 'MMMM dd, yyyy')}
        </p>
      </div>
      <Image src={image} fallback="/avatar.png" preview={false} width={46} />
    </div>
  );
}

Author.propTypes = {
  author: PropTypes.shape({
    username: PropTypes.string,
    bio: PropTypes.string,
    image: PropTypes.string,
    following: PropTypes.bool,
  }),
  createdAt: PropTypes.string,
};
