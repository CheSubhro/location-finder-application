import React, { useEffect, useRef } from 'react';

const Map = ({ locations }) => {
    const mapRef = useRef(null);

    useEffect(() => {
        const loadMap = async () => {
            if (!mapRef.current || !window.google) return;

            const map = new window.google.maps.Map(mapRef.current, {
                center: { lat: 0, lng: 0 },
                zoom: 2,
            });

            locations.forEach(location => {
                new window.google.maps.Marker({
                    position: { lat: location.latitude, lng: location.longitude },
                    map,
                    title: location.name,
                });
            });
        };

        const loadGoogleMapsScript = () => {
            const googleMapsScript = document.createElement('script');
            googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY`;
            googleMapsScript.async = true;
            googleMapsScript.defer = true;
            googleMapsScript.onload = loadMap;
            document.body.appendChild(googleMapsScript);
        };

        loadGoogleMapsScript();

        return () => {
            // Clean up script tag if component unmounts
            const scriptTag = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
            if (scriptTag) {
                scriptTag.remove();
            }
        };
    }, [locations]);

    return (
        <div ref={mapRef} style={{ width: '100%', height: '400px' }} />
    );
};

export default Map;
