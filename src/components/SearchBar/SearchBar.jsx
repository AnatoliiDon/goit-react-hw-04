import toast, { Toaster } from 'react-hot-toast';
import { useState } from 'react';
import css from './searchBar.module.css';
const SearchBar = ({ onSubmit }) => {
  const [enteredValue, setEnteredValue] = useState('');

  const notify = ({ currentTarget: { value } }) => {
    setEnteredValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const trimSearchQuery = enteredValue.trim();

    if (trimSearchQuery === '') {
      toast('Please, enter search word!');
      return;
    }

    onSubmit(enteredValue);
    setEnteredValue('');
  };
  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={enteredValue}
          onChange={notify}
          className={css.input}
        />
        <button className={css.searchBtn} type="submit">
          Search
        </button>
        <Toaster />
      </form>
    </header>
  );
};

export default SearchBar;
