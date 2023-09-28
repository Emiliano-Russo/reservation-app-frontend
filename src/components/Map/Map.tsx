import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import React, { useRef, useEffect } from 'react';
import { GOOGLE_API_KEY_MAPS } from '../../../env';
import styles from './Map.module.css';
import { MapClickCallbackData } from '@capacitor/google-maps/dist/typings/definitions';

interface Props {
  onMarkerPlace: (event: MapClickCallbackData) => void;
}

const MyMap: React.FC<Props> = (props: Props) => {
  const mapRef = useRef<HTMLDivElement>(null);
  let newMap: GoogleMap;

  let currentMarker: any = null;

  useEffect(() => {
    async function initializeMapWithUserLocation() {
      // Solicita la ubicación del usuario
      let position;
      try {
        position = await Geolocation.getCurrentPosition();
      } catch (error) {
        console.error('Error obteniendo la ubicación:', error);
        return;
      }

      if (!mapRef.current) return;

      newMap = await GoogleMap.create({
        id: 'my-cool-map',
        element: mapRef.current,
        apiKey: GOOGLE_API_KEY_MAPS,
        config: {
          center: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          zoom: 8,
        },
      });

      // Establecer un oyente para el evento de clic en el mapa
      newMap.setOnMapClickListener(async (event) => {
        console.log('¡Se hizo clic en el mapa!', event);
        props.onMarkerPlace(event);
        // Elimina el marcador actual si existe
        if (currentMarker) {
          newMap.removeMarker(currentMarker);
        }

        // Agrega un nuevo marcador en la ubicación donde se hizo clic
        currentMarker = await newMap.addMarker({
          coordinate: {
            lat: event.latitude,
            lng: event.longitude,
          },
          title: 'Marcador del usuario',
        });
      });
    }

    initializeMapWithUserLocation();

    // Cleanup function
    return () => {
      if (newMap) {
        newMap.destroy();
      }
    };
  }, []); // El array vacío asegura que este useEffect se ejecuta solo una vez

  return (
    <div
      ref={mapRef}
      id="my-cool-map"
      style={{
        width: '100%',
        height: '250px',
        overflow: 'visible',
      }}
    ></div>
  );
};

export default MyMap;
