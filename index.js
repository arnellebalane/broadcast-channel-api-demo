const channel = new BroadcastChannel('messages');
const messagesContainer = document.querySelector('.messages');

function createMessageElement(message, isSelf) {
    const li = document.createElement('li');
    li.textContent = message;
    li.classList.add('message');
    if (isSelf) {
        li.classList.add('self');
    }
    return li;
}

function addMessage(message, isSelf) {
    const li = createMessageElement(message, isSelf);
    messagesContainer.appendChild(li);

    const height = messagesContainer.getBoundingClientRect().height;
    const scrollHeight = messagesContainer.scrollHeight;
    messagesContainer.scrollTop = scrollHeight - height;
}

document.querySelector('.message-form').addEventListener('submit', e => {
    e.preventDefault();
    const message = e.target.message.value;
    e.target.message.value = '';
    if (!message) return;

    addMessage(message, true);
    channel.postMessage(message);
});

channel.addEventListener('message', e => addMessage(e.data, false));
