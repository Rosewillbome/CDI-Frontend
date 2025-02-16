import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const GeoJSON = dynamic(() => import('react-leaflet').then((mod) => mod.GeoJSON), { ssr: false });

import 'leaflet/dist/leaflet.css';

const UgandaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetch('/uganda.geojson')
        .then((response) => response.json())
        .then((data) => {
          setGeoData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error loading GeoJSON:', error);
          setLoading(false);
        });
    }
  }, []);

  const defaultStyle = {
    color: 'black',
    weight: 1.5,
    fillColor: '#72B3E0',
    fillOpacity: 0.6,
  };

  const highlightStyle = {
    color: 'blue',
    weight: 3,
    fillColor: '#FFD700',
    fillOpacity: 0.8,
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (event) => {
        const layer = event.target;
        layer.setStyle(highlightStyle);
        layer.bringToFront();
        layer.bindTooltip(`<b>${feature.properties.name}</b>`, {
          permanent: false,
          direction: 'top',
          opacity: 0.9,
        }).openTooltip();
      },
      mouseout: (event) => {
        const layer = event.target;
        layer.setStyle(defaultStyle);
        layer.closeTooltip();
      },
    });
  };

  return (
    <div style={{ position: 'relative', height: '60vh', width: '100%', background: '#f0f0f0' }}>
      {typeof window !== 'undefined' && (
        <MapContainer
          center={[1.3733, 32.2903]}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
        >
          {geoData && <GeoJSON data={geoData} style={() => defaultStyle} onEachFeature={onEachFeature} />}
        </MapContainer>
      )}
    </div>
  );
};

export default UgandaMap;
