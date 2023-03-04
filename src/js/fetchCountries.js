export const fetchCountries = name => {
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=,name,capital,population,flag,languages`
  )
    .then(response => {
      //якщщо 404, не має країни повернути пустий масив
      if (!response.ok) {
        if (response.status === 404) {
          return [];
        }

        throw new Error(response.status);
      }

      return response.json();
    })
    .catch(error => {
      console.log(error);
    });
};