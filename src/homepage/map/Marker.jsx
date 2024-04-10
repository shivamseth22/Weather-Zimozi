import React from 'react';

const Marker = ({ lat, lng, aqi }) => {
  return (
    <div
      style={{
        position: 'absolute',
        transform: 'translate(-50%, -100%)',
        background: 'white',
        border: '2px solid #333',
        borderRadius: '50%',
        width: '20px',
        height: '20px',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '20px',
        color: 'black',
        zIndex: 1000,
      }}
    >
      {aqi}
    </div>
  );
};

export default Marker;
