import Modal from 'react-modal';
import css from './imageModal.module.css';

const ImageModale = ({ isOpen, onClose, bigPhotoData }) => {
  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      overlayClassName={css.customOverlayStyles}
      className={css.customStyles}
      onRequestClose={onClose}
    >
      <button onClick={onClose} type="button" className={css.closeBtn}>
        ❌
      </button>
      <img
        src={bigPhotoData.data}
        alt={bigPhotoData.alt}
        className={css.bigImg}
      />
    </Modal>
  );
};

export default ImageModale;
