const channel = new BroadcastChannel('counter');
let value = 0;

const displayedValue = document.querySelector('h1');
const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');

updateValue(0);

function updateValue(delta) {
    value += delta;
    displayedValue.textContent = value;
}

channel.onmessage = (e) => updateValue(e.data);

upButton.onclick = (e) => {
    channel.postMessage(1);
    updateValue(1);
};
downButton.onclick = (e) => {
    channel.postMessage(-1);
    updateValue(-1);
}
