import {
  getLocalStorageKeys,
  handleSubmitFormAddTodo,
  setDarkTheme,
} from './functions';
import { Todo } from './types';

let darkTheme: boolean = getLocalStorageKeys().darkTheme === 'true';

let allToDos: Todo[] = [];

setDarkTheme(darkTheme, true);

const changeThemeBtn = document.querySelector('[data-change-theme-button]');

changeThemeBtn?.addEventListener('click', () => {
  darkTheme = setDarkTheme(darkTheme, false);
});

const formAddToDo = document.querySelector('[data-form-add-todo]');

formAddToDo?.addEventListener('submit', (e) => {
  e.preventDefault();

  const target: HTMLInputElement | null = document.querySelector(
    '[data-input-add-todo]'
  );

  allToDos = handleSubmitFormAddTodo(target?.value, allToDos, darkTheme);
});
