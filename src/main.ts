import { getLocalStorageKeys, setDarkTheme } from './functions';

const changeThemeBtn = document.querySelector('[data-change-theme-button]');
let darkTheme: boolean = getLocalStorageKeys().darkTheme === 'true';

setDarkTheme(darkTheme, true);

changeThemeBtn?.addEventListener('click', () => {
  setDarkTheme(darkTheme, false);
});
