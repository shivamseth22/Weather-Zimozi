import React, { useState, useEffect } from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTheme } from '@mui/system';

// Define changeTheme function outside the Theme component
const changeTheme = (newTheme) => {
  // Update the theme mode
  // Implement your logic to change the theme here
  // Example: You can set a state variable or dispatch an action to update the theme
  console.log('Changing theme to:', newTheme);

  // Save the selected theme mode to local storage
  localStorage.setItem('themeMode', newTheme);
};

const Theme = () => {
  const theme = useTheme();
  const [selectedValue, setSelectedValue] = useState(theme.palette.mode);

  // Load theme mode from local storage on component mount
  useEffect(() => {
    const savedThemeMode = localStorage.getItem('themeMode');
    if (savedThemeMode) {
      // Set the selected value from local storage
      setSelectedValue(savedThemeMode);
      // Apply the saved theme mode
      changeTheme(savedThemeMode);
    }
  }, []);

  const handleThemeChange = (event) => {
    const newTheme = event.target.value;
    // Update the selected value
    setSelectedValue(newTheme);
    // Apply the new theme
    changeTheme(newTheme);
  };

  return (
    <Select
      sx={{ width: "300px", backgroundColor: 'white' }}
      value={selectedValue}
      onChange={handleThemeChange}
      fullWidth
    >
      <MenuItem value="light">Light</MenuItem>
      <MenuItem value="dark">Dark</MenuItem>
    </Select>
  );
};

export default Theme;
