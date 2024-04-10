import React from 'react';
import { Select, MenuItem } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <Select
    sx={{width:"300px" , backgroundColor:'white'}}
      value={i18n.language}
      onChange={(event) => changeLanguage(event.target.value)}
      fullWidth
    >
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="es">Spanish</MenuItem>
    </Select>
  );
};

export default Language;
