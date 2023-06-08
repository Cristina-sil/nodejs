
import http from 'node:http';

const server = http.createServer((request,response)=> {
    return response.end('Helo world')
})

server.listen(3333)
