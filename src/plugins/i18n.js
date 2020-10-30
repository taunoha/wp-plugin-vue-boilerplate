const i18n = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                __(str) {
                    return ld_{plugin}.str[str] || str;
                }
            }
        });
    }
};

export default i18n;
