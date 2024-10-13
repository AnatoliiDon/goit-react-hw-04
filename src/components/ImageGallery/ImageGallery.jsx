import ImageCard from '../ImageCard/ImageCard';
import styles from './imageGallery.module.css';

const ImageGallery = ({ photosData, openModal }) => {
  return (
    <ul className={styles.imageList}>
      {photosData.map(photoData => {
        return (
          <li
            key={photoData.id}
            className={styles.imageListItem}
            onClick={openModal}
          >
            <ImageCard photoData={photoData} />
          </li>
        );
      })}
    </ul>
  );
};

export default ImageGallery;
