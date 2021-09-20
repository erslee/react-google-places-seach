export const geocodeByLatLng = (latLng) => {
  const geocoder = new window.google.maps.Geocoder();
  const { OK } = window.google.maps.GeocoderStatus;

  return new Promise((resolve, reject) => {
    geocoder.geocode(
      { location: latLng },
      (
        results,
        status,
      ) => {
        if (status !== OK) return reject(status);

        return resolve(results);
      }
    );
  });
};
