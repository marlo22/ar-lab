const textAreaElement = document.querySelector('textarea');
const buttonElement = document.querySelector('button');

textAreaElement.addEventListener('change', (event) => {
  buttonElement.disabled = !event.target.value;
});

buttonElement.addEventListener('click', () => {
  location = `/viewer/index.html?d=${JSON.stringify(JSON.parse(textAreaElement.value))}`
});