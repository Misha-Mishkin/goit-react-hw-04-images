import { useState, useEffect } from 'react';
import ImageGallery from './ImageGallery';
import Searchbar from './Searchbar';
import Loader from './Loader';
import Button from './Button';
import { fetchPicture } from './service.api.js';
import s from './App.module.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [gallery, setGallery] = useState([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    setLoading(true);
    setStatus('pending');

    fetchPicture(searchQuery, page)
      .then(data => {
        if (data.totalHits === 0) {
          toast.error(`"${searchQuery}" not found!`);
          setStatus('rejected');
        } else {
          setGallery(gallery => [...gallery, ...data.hits]);
          setTotalHits(data.totalHits);
          setStatus('resolved');
        }
      })
      .catch(error => {
        toast.error(error.message);
        setStatus('rejected');
      })
      .finally(setLoading(false));
  }, [searchQuery, page]);

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setGallery([]);
    setPage(1);
  };

  const onLoadMoreButton = () => {
    setPage(prevPage => prevPage + 1);
  };

  const totalPages = totalHits / 12;

  return (
    <div className={s.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {gallery && <ImageGallery images={gallery} />}
      {loading && <Loader />}
      {status === 'resolved' && totalPages > page && (
        <Button text="Load more" handleClick={onLoadMoreButton} />
      )}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}
