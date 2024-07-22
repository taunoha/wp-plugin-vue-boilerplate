import { createI18n, sprintf as wpSprintf } from "@wordpress/i18n";

const i18n = createI18n();

export const __ = i18n.__;
export const _x = i18n._x;
export const _n = i18n._n;
export const _nx = i18n._nx;
export const sprintf = wpSprintf;
export const setLocaleData = i18n.setLocaleData;
