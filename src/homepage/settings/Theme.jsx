import React, { useState } from 'react';
import { Select, MenuItem } from '@mui/material';

const Theme = () => {
  const [theme, setTheme] = useState('Dark');

  const handleChange = (event) => {
    setTheme(event.target.value);
    // You can perform any additional actions based on the selected theme here
  };

  return (
    <Select

      value={theme}
      onChange={handleChange}
      fullWidth
      sx={{ width: "300px",backgroundColor:'white' }}
    >
      <MenuItem value="Dark">Dark</MenuItem>
      <MenuItem value="Light">Light</MenuItem>
    </Select>
  );
};

export default Theme;
