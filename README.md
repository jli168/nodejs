nodejs
======

This repo comes along with the learning process of node.js

It is a proof-of-concept chatroom.

Use node.js, Express.js, socket.io, redis

The session info socket.io gets from node server is by handshake/authorization mechanism.
Details is explained in the blog: http://www.danielbaulig.de/socket-ioexpress/

Redis is used for socket.io's session store, which is scalable, compared to MemoryStore.

