import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar/SearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import './App.css';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';

function App() {
  const [query, setQuery] = useState(null);
  const [page, setPage] = useState(1);
  const [photosData, setPhotosData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const accessKey = 'r21YpYkIhEbJxvNOZ4mo7wQhCUtlMTjvYkyu5-o3dhk';
  const onSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    setQuery(form.elements.query.value);
  };

  //

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        if (query === null) {
          return;
        }
        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?page=${page}&client_id=${accessKey}&query=${query}&orientation=landscape`
        );
        setPhotosData([...photosData, ...data.results]);
        console.log(photosData);
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

  return (
    <div>
      <SearchBar onSubmit={onSubmit} query={query} setQuery={setQuery} />
      <ImageGallery photosData={photosData} />
      {isLoading && (
        <div>
          <Loader />
        </div>
      )}
      {error && <ErrorMessage />}
      {photosData.length === 0 ? null : <LoadMoreBtn loadMore={loadMore} />}
    </div>
  );
}

export default App;
