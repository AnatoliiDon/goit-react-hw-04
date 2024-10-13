import css from './ImageCard.module.css';

const ImageCard = ({ photoData }) => {
  return (
    <div className={css.photoContainer}>
      <img
        src={photoData.urls.small}
        alt={photoData.description}
        data-img={photoData.urls.regular}
        data-alt={photoData.description}
        width={400}
        height={275}
      />
    </div>
  );
};

export default ImageCard;
