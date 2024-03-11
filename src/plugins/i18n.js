let _translations = null;

export const __ = (str = "") =>
  _translations ? _translations[str] || str : str;

const i18n = {
  install(app, translations = []) {
    _translations = translations;
    app.config.globalProperties.__ = __;
  },
};

export default i18n;
