import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const refs = {
  input: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener(
  'input',
  debounce(e => {
    const trimValue = refs.input.value.trim();
    console.log('Очищаємо розмітку');
    fetchCountries(trimValue).then(foundData => {
      // якщо знайдено більше 10 країн - виводимо сповіщення
      if (foundData.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );

        // якщо знайдено 0 країн - виводимо сповіщення
      } else if (foundData.length === 0) {
        Notiflix.Notify.failure('Oops, there is no country with that name');

        // якщо знайдено >= 2 країн і <= 10 виводимо на сторінку дані
      } else if (foundData.length >= 2 && foundData.length <= 10) {
        // renderCountryList(foundData); //
        console.log('вивід списку - країн на сторінку');

        // якщо знайдена 1 країна - виводимо на сторінку 1 країну
      } else if (foundData.length === 1) {
        // renderOneCountry(foundData); //
        console.log('вивід 1 країни на сторінку');
      }
    });
  }, DEBOUNCE_DELAY)
);
