import { createI18n, sprintf as wpSprintf } from "@wordpress/i18n";

const i18n = createI18n();

export const __ = (text = "") => i18n.__(text);
export const _x = (text = "", context = "") => i18n._x(text, context);
export const _n = (text = "", textPlural = "", number = 0) =>
  wpSprintf(i18n._n(text, textPlural, number), number);
export const _nx = (text = "", textPlural = "", number = 0, context = "") =>
  wpSprintf(i18n._nx(text, textPlural, number, context), number);
// Source: https://github.com/alexei/sprintf.js
export const sprintf = wpSprintf;
export const setLocaleData = i18n.setLocaleData;
