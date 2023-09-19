export function setDarkTheme(darkTheme: boolean, loadingPage: boolean) {
  const body = document.querySelector('[data-body]');
  const header = document.querySelector('[data-header]');
  const appSection = document.querySelector('[data-app-section]');
  const footer = document.querySelector('[data-footer]');
  const changeThemeBtn = document.querySelector('[data-change-theme-button]');
  const allBtns = document.querySelectorAll(
    '.btn-with-icon, .btn-without-icon'
  );

  if (!loadingPage) {
    darkTheme = !darkTheme;
    localStorage.setItem('darkTheme', `${darkTheme}`);
  }

  body?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  header?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  appSection?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  footer?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  changeThemeBtn?.setAttribute(`data-dark-theme`, `${darkTheme}`);

  allBtns.forEach((btn) => {
    btn?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  });
}

export function getLocalStorageKeys(): { darkTheme: string | null } {
  const keysObj: { darkTheme: string | null } = {
    darkTheme: localStorage.getItem('darkTheme'),
  };

  return keysObj;
}
