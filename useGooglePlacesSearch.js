import { useEffect, useState } from 'react';
import { requestBuilder } from './helpers/requestBuilder';
import { Loader } from '@googlemaps/js-api-loader';
import _ from 'lodash';

export const useGooglePlacesSearch = ({
    apiKey = '',
    apiOptions = {},
    autocompletionRequest = {},
    debounce = 300,
    minLengthAutocomplete = 1,
    // selectProps = {},
    onLoadFailed = console.error,
    withSessionToken = false,
}) => {
    const [placesService, setPlacesService] = useState(undefined);
    const [sessionToken, setSessionToken] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [serviceStatus, setServiceStatus] = useState(undefined);
    const [places, setPlaces] = useState([]);

    const autocomplete =  _.debounce((value) => {
        if (!placesService) {
            setPlaces([]);
            setLoading(false);
            return;
        }
        if (value.length < minLengthAutocomplete) {
            setPlaces([]);
            setLoading(false);
            return;
        }
        setLoading(true);

        const autocompletionReq = { ...autocompletionRequest };

        placesService.getPlacePredictions(
            requestBuilder(
                autocompletionReq,
                value,
                withSessionToken && sessionToken,
            ), (suggestions, serviceStatus) => {
                setPlaces((suggestions || []).map(suggestion => ({ label: suggestion.description, value: suggestion })));
                setLoading(false);
                setServiceStatus(serviceStatus);
            },
        );
    }, debounce)

    const initializeService = () => {
        if (!window.google) throw new Error('[react-google-places-autocomplete]: Google script not loaded');
        if (!window.google.maps) throw new Error('[react-google-places-autocomplete]: Google maps script not loaded');
        if (!window.google.maps.places) throw new Error('[react-google-places-autocomplete]: Google maps places script not loaded');

        setPlacesService(new window.google.maps.places.AutocompleteService());
        setSessionToken(new window.google.maps.places.AutocompleteSessionToken());
    }

    useEffect(() => {
        const init = async () => {
            try {
                if (!window.google || !window.google.maps || !window.google.maps.places) {
                    await new Loader({ apiKey, ...{ libraries: ['places'], ...apiOptions } }).load();
                }
                initializeService();
            } catch (error) {
                onLoadFailed(error);
            }
        }

        if (apiKey) init();
        else initializeService();
    }, []);

    return [{places, loading, serviceStatus }, autocomplete];
};
