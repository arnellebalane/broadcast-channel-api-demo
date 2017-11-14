if (!window.BroadcastChannel) {
    throw new Error('BroadcastChannel API is not supported :(');
}

const unsupported = document.querySelector('.unsupported');
unsupported.remove();

const model = document.querySelector('.model');
const channel = new BroadcastChannel('demo');

channel.onmessage = e => {
    model.style.top = e.data.y + '%';
    model.style.left = e.data.x + '%';
};

let dragging = false;

const mouse = e => {
    const ref = 'pageX' in e ? e : e.touches[0];
    return { x: ref.pageX, y: ref.pageY };
};

const handlePointerDown = e => dragging = true;
const handlePointerUp = e => dragging = false;
const handlePointerMove = e => {
    if (dragging) {
        const position = {
            x: mouse(e).x / window.innerWidth * 100,
            y: mouse(e).y / window.innerHeight * 100
        };
        channel.postMessage(position);
        channel.onmessage({ data: position });
    }
};

model.onpointerdown = handlePointerDown;
model.onmousedown = handlePointerDown;
model.ontouchstart = handlePointerDown;

document.onpointerup = handlePointerUp;
document.onmouseup = handlePointerUp;
document.ontouchend = handlePointerUp;

document.onpointermove = handlePointerMove;
document.onmousemove = handlePointerMove;
document.ontouchmove = handlePointerMove;
