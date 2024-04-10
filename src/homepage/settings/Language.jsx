// Language.js
import React from 'react';
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('es')}>Spanish</button>
    </div>
  );
};

export default Language;
