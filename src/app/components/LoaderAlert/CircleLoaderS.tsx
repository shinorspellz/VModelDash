import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const CircleLoaderS = () => {
  return (
    <>
      <Box
        sx={{ height: 'calc(100% - 80px)' }}
        className="text-center overflow-hidden w-full flex items-center justify-center"
      >
        <CircularProgress />
      </Box>
    </>
  );
};

export default CircleLoaderS;
