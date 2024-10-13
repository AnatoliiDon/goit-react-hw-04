import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';

function App() {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [photosData, setPhotosData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [bigPhotoData, setBigPhotoData] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const accessKey = 'r21YpYkIhEbJxvNOZ4mo7wQhCUtlMTjvYkyu5-o3dhk';
  const onSubmit = searchedValue => {
    setPhotosData([]);
    setPage(1);
    setQuery(searchedValue);
  };

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        if (query === null) {
          return;
        }
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?page=${page}&client_id=${accessKey}&query=${query}&orientation=landscape&per_page=9`
        );
        setPhotosData([...photosData, ...data.results]);
        setTotalPages(data.total_pages);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPhotos();
  }, [query, page]);

  const loadMore = () => {
    setPage(page + 1);
  };

  const openModal = event => {
    setIsOpen(true);
    const bigPhotoData = event.target.dataset;

    setBigPhotoData({
      data: bigPhotoData.img,
      alt: bigPhotoData.alt,
    });
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={onSubmit} query={query} setQuery={setQuery} />
      <ImageGallery photosData={photosData} openModal={openModal} />
      <ImageModal
        onClose={onClose}
        isOpen={isOpen}
        bigPhotoData={bigPhotoData}
      />
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      {photosData.length === 0 || totalPages === page ? null : (
        <LoadMoreBtn loadMore={loadMore} />
      )}
    </div>
  );
}

export default App;
