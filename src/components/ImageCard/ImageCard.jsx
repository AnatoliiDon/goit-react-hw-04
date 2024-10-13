import css from './ImageCard.module.css';

const ImageCard = ({ photoData, openModal }) => {
  return (
    <div className={css.photoContainer}>
      <img
        src={photoData.urls.small}
        alt={photoData.description}
        data-img={photoData.urls.regular}
        data-alt={photoData.description}
        width={400}
        height={275}
        onClick={openModal}
      />
    </div>
  );
};

export default ImageCard;
