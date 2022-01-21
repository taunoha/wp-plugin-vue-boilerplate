const i18n = {
  install(app, translations) {
    app.mixin({
      methods: {
        __(str) {
          return translations ? translations[str] || str : str;
        }
      }
    });
  }
};

export default i18n;
