export const requestBuilder = (
    autocompletionRequest,
    input,
    sessionToken,
) => {
    const {
        bounds,
        location,
        ...rest
    } = autocompletionRequest;

    const res = {
        input,
        ...rest,
    };

    if (sessionToken) {
        res.sessionToken = sessionToken;
    }

    if (bounds) {
        res.bounds = new window.google.maps.LatLngBounds(...bounds);
    }

    if (location) {
        res.location = new window.google.maps.LatLng(location);
    }

    return res;
};