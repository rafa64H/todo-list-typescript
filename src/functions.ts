import { globalVariables } from './main';
import { Todo } from './types';
import { v4 as uuidv4 } from 'uuid';

export function getLocalStorageKeys(): {
  darkTheme: string | null;
  allToDos: string | null;
} {
  const keysObj = {
    darkTheme: localStorage.getItem('darkTheme'),
    allToDos: localStorage.getItem('allToDos'),
  };

  return keysObj;
}

export function setDarkTheme(loadingPage: boolean): void {
  const body = document.querySelector('[data-body]');
  const header = document.querySelector('[data-header]');
  const appSection = document.querySelector('[data-app-section]');
  const footer = document.querySelector('[data-footer]');
  const changeThemeBtn = document.querySelector('[data-change-theme-button]');
  const allBtns = document.querySelectorAll(
    '.btn-with-icon, .btn-without-icon'
  );

  globalVariables.darkTheme = loadingPage
    ? globalVariables.darkTheme
    : !globalVariables.darkTheme;

  localStorage.setItem('darkTheme', `${globalVariables.darkTheme}`);

  body?.setAttribute(`data-dark-theme`, `${globalVariables.darkTheme}`);
  header?.setAttribute(`data-dark-theme`, `${globalVariables.darkTheme}`);
  appSection?.setAttribute(`data-dark-theme`, `${globalVariables.darkTheme}`);
  footer?.setAttribute(`data-dark-theme`, `${globalVariables.darkTheme}`);
  changeThemeBtn?.setAttribute(
    `data-dark-theme`,
    `${globalVariables.darkTheme}`
  );

  allBtns.forEach((btn) => {
    btn?.setAttribute(`data-dark-theme`, `${globalVariables.darkTheme}`);
  });
}

export function handleSubmitFormAddTodo(
  valueInput: string | undefined
): Todo[] {
  if (!valueInput) return globalVariables.allToDos;

  const newTodo: Todo = {
    id: `${uuidv4()}`,
    text: `${valueInput}`,
    checked: false,
  };

  const newAllToDos: Todo[] = [newTodo, ...globalVariables.allToDos];

  createTodoItems(newAllToDos);

  localStorage.setItem(`allToDos`, JSON.stringify(newAllToDos));

  return newAllToDos;
}

export function createTodoItems(todoItemsArray: Todo[]): void {
  globalVariables.allToDos.map((todoObjItem: Todo) => {
    const previousTodoElement = document.getElementById(`${todoObjItem.id}`);

    previousTodoElement?.remove();
  });

  todoItemsArray.map((todoObjItem) => {
    createSingleTodoItem(todoObjItem);
  });
}

export function createSingleTodoItem(todoObjItem: Todo): void {
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
  if (todoObjItem.checked) {
    btnCheckElement.setAttribute('data-checked-todo', 'true');
    btnCheckElementIcon.classList.add('fa-check');
  }

  textLiElement.classList.add('todo-list-item__p');
  textLiElement.textContent = `${todoObjItem.text}`;

  btnDeleteElement.classList.add('btn-with-icon', 'btn-remove-todo');
  btnDeleteElementIcon.classList.add('fa-solid', 'fa-trash');

  btnCheckElement.addEventListener('click', (): void => {
    const itemInAllTodos = globalVariables.allToDos.filter(
      (todo: Todo) => todo.id === liElement.id
    )[0];

    if (itemInAllTodos.checked) {
      itemInAllTodos.checked = false;

      btnCheckElement.setAttribute('data-checked-todo', 'false');
      btnCheckElementIcon.classList.remove('fa-check');
    } else {
      itemInAllTodos.checked = true;

      btnCheckElement.setAttribute('data-checked-todo', 'true');
      btnCheckElementIcon.classList.add('fa-check');
    }
    localStorage.setItem(`allToDos`, JSON.stringify(globalVariables.allToDos));
  });

  btnDeleteElement.addEventListener('click', (): void => {
    const filteredAllTodos = globalVariables.allToDos.filter(
      (todo: Todo) => todo.id !== liElement.id
    );

    globalVariables.allToDos = filteredAllTodos;
    localStorage.setItem(`allToDos`, JSON.stringify(globalVariables.allToDos));

    liElement.remove();
  });

  liElement.append(btnCheckElement);
  liElement.append(textLiElement);
  liElement.append(btnDeleteElement);

  btnCheckElement.append(btnCheckElementIcon);
  btnDeleteElement.append(btnDeleteElementIcon);

  todoListElement?.append(liElement);
}
