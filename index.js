let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");

function loadTasks() {
	if (localStorage.getItem('tasks')) {
		return JSON.parse(localStorage.getItem('tasks'));
	} else {
	return items;
	}
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	deleteButton.addEventListener('click', function() {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', function() {
		const itemName = textElement.textContent;
		const newItem = createItem(item);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
    saveTasks(items);
	});

	editButton.addEventListener('click', function() {
		textElement.setAttribute('contenteditable', 'true');
    textElement.focus();
	});

	 textElement.addEventListener('blur', function() {
        textElement.setAttribute('contenteditable', 'false');
        const items = getTasksFromDOM();
        saveTasks(items);
    });

	return clone;

}

function getTasksFromDOM() {
	var itemsNamesElements = listElement.querySelectorAll('.to-do__item-text');
	tasks = [];
	itemsNamesElements.forEach (function(element) {
		tasks.push(element.textContent);
	});
	return tasks;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

formElement.addEventListener('submit', function(ev) {
	ev.preventDefault();
	const taskText = inputElement.value.trim();
	if (taskText) {
		const newItem = createItem(taskText);
		listElement.prepend(newItem);
		const items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = '';
	}
})

items = loadTasks();
items.forEach(function(item){
	const Element = createItem(item);
	listElement.append(Element);
});
