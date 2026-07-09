// 할 일 목록을 저장하는 배열 (메모리에만 저장, 새로고침 시 초기화됨)
let todos = [];

// 각 할 일을 구분하기 위한 id 카운터
let nextId = 1;

// DOM 요소
let todoInput;
let addBtn;
let todoListEl;

// 배열 상태를 기반으로 화면을 다시 그리는 함수
function renderTodos() {
  todoListEl.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.completed ? " completed" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const span = document.createElement("span");
    span.className = "todo-text";
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "삭제";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.id));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoListEl.appendChild(li);
  });
}

// 할 일 추가
function addTodo() {
  const text = todoInput.value.trim();

  if (text === "") {
    alert("할 일을 입력하세요.");
    return;
  }

  todos.push({ id: nextId++, text, completed: false });
  todoInput.value = "";
  renderTodos();
}

// 완료/미완료 토글
function toggleTodo(id) {
  const todo = todos.find((t) => t.id === id);
  if (todo) {
    todo.completed = !todo.completed;
    renderTodos();
  }
}

// 항목 삭제
function deleteTodo(id) {
  todos = todos.filter((t) => t.id !== id);
  renderTodos();
}

// 앱 초기화 함수
function initApp() {
  todoInput = document.getElementById("todo-input");
  addBtn = document.getElementById("add-btn");
  todoListEl = document.getElementById("todo-list");

  addBtn.addEventListener("click", addTodo);
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  });

  renderTodos();
}

initApp();
