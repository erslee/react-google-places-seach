export const geocodeByPlaceId = (placeId) => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { placeId },
      (
        results,
        status,
      ) => {
        if (status !== OK) {
          return reject(status);
        }
        return resolve(results);
      });
  });
};
