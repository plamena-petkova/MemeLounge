const element = document.getElementById('errorBox');
const output = document.querySelector('span');


export function notify(message) {
    output.textContent = message;
    element.style.display = 'block';

    setTimeout(() => element.style.display = 'none', 3000);

}

window.notify = notify;