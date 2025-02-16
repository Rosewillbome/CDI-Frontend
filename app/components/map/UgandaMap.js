import React, { useEffect, useState } from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const UgandaMap = () => {
  const [geoData, setGeoData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const geoJsonStyle = () => ({
    color: 'gray',
    weight: 2,
    fillOpacity: 0.3
  });

  const onEachFeature = (feature, layer) => {
    layer.on({
      mouseover: (event) => {
        const layer = event.target;
        layer.setStyle({
          weight: 4,
          color: 'blue',
          fillOpacity: 0.5
        });
        layer.bindTooltip(feature.properties.name, { permanent: false }).openTooltip();
      },
      mouseout: (event) => {
        const layer = event.target;
        layer.setStyle(geoJsonStyle());
        layer.closeTooltip();
      }
    });
  };

  return (
    <div style={{ position: 'relative', height: '60vh', width: '100%' }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          zIndex: 9999
        }}>
          <div className="spinner"></div>
        </div>
      )}
      <MapContainer center={[1.3733, 32.2903]} zoom={7} style={{ height: '100%', width: '100%', background:'transparent' }}>
        {geoData && <GeoJSON data={geoData} style={geoJsonStyle} onEachFeature={onEachFeature} />}
      </MapContainer>
    </div>
  );
};

export default UgandaMap;
