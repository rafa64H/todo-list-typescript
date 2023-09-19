import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';

export function setDarkTheme(
  darkTheme: boolean,
  loadingPage: boolean
): boolean {
  const body = document.querySelector('[data-body]');
  const header = document.querySelector('[data-header]');
  const appSection = document.querySelector('[data-app-section]');
  const footer = document.querySelector('[data-footer]');
  const changeThemeBtn = document.querySelector('[data-change-theme-button]');
  const allBtns = document.querySelectorAll(
    '.btn-with-icon, .btn-without-icon'
  );

  darkTheme = loadingPage ? darkTheme : !darkTheme;

  localStorage.setItem('darkTheme', `${darkTheme}`);

  body?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  header?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  appSection?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  footer?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  changeThemeBtn?.setAttribute(`data-dark-theme`, `${darkTheme}`);

  allBtns.forEach((btn) => {
    btn?.setAttribute(`data-dark-theme`, `${darkTheme}`);
  });

  return darkTheme;
}

export function getLocalStorageKeys(): {
  darkTheme: string | null;
} {
  const keysObj: { darkTheme: string | null } = {
    darkTheme: localStorage.getItem('darkTheme'),
  };

  return keysObj;
}

export function handleSubmitFormAddTodo(
  valueInput: string | undefined,
  allToDos: Todo[],
  darkTheme: boolean
): Todo[] {
  if (!valueInput) return allToDos;

  const newTodo: Todo = {
    id: `${uuidv4()}`,
    text: `${valueInput}`,
    checked: false,
  };

  const newAllToDos: Todo[] = [newTodo, ...allToDos];

  createTodoItems(newAllToDos, darkTheme);

  return newAllToDos;
}

export function createTodoItems(
  todoItemsArray: Todo[],
  darkTheme: boolean
): void {
  todoItemsArray.map((todoObjItem) => {
    const previousTodoElement = document.getElementById(`${todoObjItem.id}`);

    previousTodoElement?.remove();

    createSingleTodoItem(todoObjItem);
  });
}

export function createSingleTodoItem(todoObjItem: Todo) {
  const todoListElement = document.querySelector('[data-todo-list]');

  const liElement = document.createElement('li');
  const btnCheckElement = document.createElement('button');
  const btnCheckElementIcon = document.createElement('i');
  const textLiElement = document.createElement('p');
  const btnDeleteElement = document.createElement('button');
  const btnDeleteElementIcon = document.createElement('i');

  liElement.id = todoObjItem.id;
  liElement.classList.add('todo-list-item');

  btnCheckElement.classList.add('btn-with-icon', 'btn-check-todo');
  btnCheckElement.setAttribute('data-checked-todo', 'false');
  btnCheckElementIcon.classList.add('fa-solid', 'btn-with-icon-i');

  textLiElement.classList.add('todo-list-item__p');
  textLiElement.textContent = `${todoObjItem.text}`;

  btnDeleteElement.classList.add('btn-with-icon', 'btn-remove-todo');
  btnDeleteElementIcon.classList.add('fa-solid', 'fa-trash');

  liElement.append(btnCheckElement);
  liElement.append(textLiElement);
  liElement.append(btnDeleteElement);

  btnCheckElement.append(btnCheckElementIcon);
  btnDeleteElement.append(btnDeleteElementIcon);

  todoListElement?.append(liElement);
}
