import s from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  id,
  webformatURL,
  tags,
  showModal,
  largeImageURL,
}) {
  return (
    <li className={s.ImageGalleryItem} key={id}>
      <img
        className={s.ImageGalleryItem_image}
        src={webformatURL}
        alt={tags}
        onClick={() => showModal(largeImageURL, tags)}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  showModal: PropTypes.func.isRequired,
};
