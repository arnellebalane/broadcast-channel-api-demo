const displayedValue = document.querySelector('h1');
const upButton = document.querySelector('.up');
const downButton = document.querySelector('.down');
const p = document.querySelector('p');

if (window.BroadcastChannel) {
    const channel = new BroadcastChannel('counter');
    let value = 0;

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
} else {
    upButton.remove();
    downButton.remove();
    p.remove();

    document.body.classList.add('not-supported');
    displayedValue.classList.add('not-supported');
    displayedValue.textContent = 'BroadcastChannel is not supported :(';
}
