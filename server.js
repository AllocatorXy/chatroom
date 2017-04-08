const http = require('http');
const io = require('socket.io');

//普通http服务器
const server = http.createServer();
server.listen(666);

//webSocket服务器
const wsServer = io.listen(server);

const aSock = [];
wsServer.on('connection', sock => {
  aSock.push(sock); // 每有一个socket链接被建立，push进aSock
  sock.on('snd', json => { // 接收前台发来的信息
    json.time = Math.floor(new Date().getTime() / 1000);
    aSock.forEach(s => { // 广播信息给所有人，除了发出者
      if (s != sock) {
        s.emit('recv', json);
      }
    });
  });
});
