import React from 'react';
import { MutatingDots } from 'react-loader-spinner';

const Loader = () => {
  return (
    <div style={centerStyle}>
      <MutatingDots
        height={100}
        width={100}
        color="#6469ff"
        secondaryColor="#6469ff"
        radius={13.5}
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

const centerStyle = {
  display: 'flex',
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
  height: '100vh', // 100% of the viewport height
};

export default Loader;
