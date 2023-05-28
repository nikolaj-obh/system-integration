import WebSocket from 'ws'; 

const ws = new WebSocket('ws://localhost:5050');

ws.on('error', console.error);

ws.on('open', function open() {
    ws.send('--- Hello from Client! ---');
});

ws.on('message', function message(data) {
    console.log('received: %s', data);
});