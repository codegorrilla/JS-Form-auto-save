import '../scss/app.scss';

const form = document.querySelector('form');
const autoSaveDelay = 500;

let autoSaveTimer = null;

const setupAutoSaveTimeout = () => {
	clearTimeout(autoSaveTimer);
	autoSaveTimer = setTimeout(doAutoSave, autoSaveDelay);
};

const doAutoSave = () => {
	const action = form.getAttribute('action');
	const formData = new FormData(form);
	fetch(action, {
		method: form.getAttribute('method'),
		body: JSON.stringify(formData),
	})
		.then((res) => res.json())
		.then((data) => console.log(JSON.stringify(data)))
		.catch((err) => console.log('Error saving form data', err));
};

form.addEventListener('input', setupAutoSaveTimeout);
form.addEventListener('submit', () => clearTimeout(autoSaveTimer));
