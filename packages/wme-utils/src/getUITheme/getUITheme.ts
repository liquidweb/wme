/**
 * Returns the active MUI theme object
 *
 * @param {string} themeVariation
 * @return {object} MUI theme object
 * @see https://mui.com/material-ui/experimental-api/css-theme-variables/customization
 */
import {
  eventsCalendarTheme,
  giveWpTheme,
  iconicWpTheme,
  kadenceTheme,
  restrictContentProTheme,
  solidWpTheme,
} from '.';

export const getUITheme = (themeVariation: string): object => {
  if (themeVariation === 'eventsCalendar') {
    return eventsCalendarTheme;
  }
  if (themeVariation === 'giveWp') {
    return giveWpTheme;
  }
  if (themeVariation === 'iconicWp') {
    return iconicWpTheme;
  }
  if (themeVariation === 'kadence') {
    return kadenceTheme;
  }
  if (themeVariation === 'restrictContentPro') {
    return restrictContentProTheme;
  }
  if (themeVariation === 'solidWp') {
    return solidWpTheme;
  }
  return {};
};
