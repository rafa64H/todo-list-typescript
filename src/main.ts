import {
  createTodoItems,
  getLocalStorageKeys,
  handleSubmitFormAddTodo,
  setDarkTheme,
} from './functions';
import { Todo } from './types';

export const globalVariables = {
  allToDos:
    JSON.parse(localStorage.getItem('allToDos') as string) === null
      ? []
      : JSON.parse(localStorage.getItem('allToDos') as string),
  darkTheme: (getLocalStorageKeys().darkTheme === 'true') as boolean,
};

console.log(globalVariables.allToDos);

setDarkTheme(true);
createTodoItems(globalVariables.allToDos);

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

const showAllTodosButton = document.querySelector('[data-show-all-btn]');

showAllTodosButton?.addEventListener('click', () => {
  createTodoItems(globalVariables.allToDos);
});

const showUndoneTodosBtn = document.querySelector('[data-show-undone-btn]');

showUndoneTodosBtn?.addEventListener('click', () => {
  const undoneTodoItems = globalVariables.allToDos.filter(
    (todoObjItem) => todoObjItem.checked === false
  );

  createTodoItems(undoneTodoItems);
});

const showCompletedTodosBtn = document.querySelector(
  '[data-show-completed-btn]'
);

showCompletedTodosBtn?.addEventListener('click', () => {
  const checkedTodoItems = globalVariables.allToDos.filter(
    (todoObjItem) => todoObjItem.checked === true
  );

  createTodoItems(checkedTodoItems);
});

const clearCompletedTodosBtn = document.querySelector(
  '[data-clear-completed-btn]'
);

clearCompletedTodosBtn?.addEventListener('click', () => {
  const filteredAllTodos = globalVariables.allToDos.filter(
    (todoObjItem) => todoObjItem.checked === false
  );

  createTodoItems(filteredAllTodos);

  globalVariables.allToDos = filteredAllTodos;
});
