import {
  getLocalStorageKeys,
  handleSubmitFormAddTodo,
  setDarkTheme,
} from './functions';
import { Todo } from './types';

export const globalVariables = {
  allToDos: [] as Todo[],
  darkTheme: (getLocalStorageKeys().darkTheme === 'true') as boolean,
};

setDarkTheme(true);

const changeThemeBtn = document.querySelector('[data-change-theme-button]');

changeThemeBtn?.addEventListener('click', () => {
  setDarkTheme(false);
});

const formAddToDo = document.querySelector('[data-form-add-todo]');

formAddToDo?.addEventListener('submit', (e) => {
  e.preventDefault();

  const target: HTMLInputElement | null = document.querySelector(
    '[data-input-add-todo]'
  );

  globalVariables.allToDos = handleSubmitFormAddTodo(target?.value);
});
