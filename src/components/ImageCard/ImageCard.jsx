import css from './ImageCard.module.css';

const ImageCard = ({ photoData }) => {
  return (
    <div className={css.photoContainer}>
      <img src={photoData.urls.small} alt={photoData.description} />
    </div>
  );
};

export default ImageCard;
