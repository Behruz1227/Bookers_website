type Location = {
    lat?: number;
    lng?: number;
};

type LocationError = string | null;

export const getLocationPermission = (
    onSuccess: (location: Location) => void,
    onError: (error: LocationError) => void
) => {
    if (!navigator.geolocation) {
        onError('Geolocation is not supported by your browser.');
        return;
    }
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lng = position.coords.longitude;
            sessionStorage.setItem('userLocation', JSON.stringify({ lat, lng }));
            onSuccess({ lat, lng });
        },
        (err) => {
            // Xato xabarini qaytarish
            onError(err.message);
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
        }
    );
};
