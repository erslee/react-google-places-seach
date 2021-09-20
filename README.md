# React Google Places Autocomplete hook

This is the Fork of <a href="https://github.com/tintef/react-google-places-autocomplete">tintef/react-google-places-autocomplete</a>


## Getting started

Install the latest version:
```sh
npm install --save npm i @erslee/react-google-places-seach
  or
yarn add npm i @erslee/react-google-places-seach
```

Use the hook in the component!
```js
import React from 'react';
import useGooglePlacesSearch from '@erslee/react-google-places-search';

const Component = () => (
const [{ places, loading, serviceStatus }, autocomplete] = useGooglePlacesSearch({
    apiKey: '***'
  });

  const handleInput = (e) => {
    const value = e.target.value;
    autocomplete(value);
  }

  const [value, inc, dec] = useCounter()
  return (
    <div className="App">
      <input onChange={handleInput} />
      {places && places.map(item => <li>item.label</li>)}
    </div>
  );
);
```

