const form = document.querySelector('#todo-form');
const input = document.querySelector('#todo-input');
const list = document.querySelector('#todo-list');
const key = 'todo-list';
let tasks;

try {
  tasks = JSON.parse(localStorage.getItem(key)) || [];
  if (!Array.isArray(tasks)) tasks = [];
} catch {
  tasks = [];
}

function save() {
  localStorage.setItem(key, JSON.stringify(tasks));
}

function render() {
  list.replaceChildren(...tasks.map((task, index) => {
    const item = document.createElement('li');
    const checkbox = document.createElement('input');
    const text = document.createElement('span');
    const remove = document.createElement('button');

    checkbox.type = 'checkbox';
    checkbox.checked = Boolean(task.done);
    checkbox.setAttribute('aria-label', `Mark ${task.text} complete`);
    checkbox.addEventListener('change', () => {
      task.done = checkbox.checked;
      save();
      render();
    });

    text.textContent = task.text;
    remove.type = 'button';
    remove.textContent = 'Delete';
    remove.setAttribute('aria-label', `Delete ${task.text}`);
    remove.addEventListener('click', () => {
      tasks.splice(index, 1);
      save();
      render();
    });

    item.classList.toggle('completed', task.done);
    item.append(checkbox, text, remove);
    return item;
  }));
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  tasks.push({ text, done: false });
  save();
  render();
  form.reset();
  input.focus();
});

render();
