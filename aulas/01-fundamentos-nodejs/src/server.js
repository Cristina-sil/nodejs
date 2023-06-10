
import http from 'node:http';

const users = [

]

const server = http.createServer((request,response)=> {
   const {method,url} = request
   if (method == 'GET' && url == '/users' ){
    return response
    .setHeader('Content-type','application/json') 
    .end(JSON.stringify(users));
   }

   else if(method == 'POST' && url == '/users'){
    users.push({
        "id":1,
        "name":"Ana",
        "email":"Cristinaana180@hotmail.com"
    })
    return response.writeHead(201).end()
   }
    return response.writeHead(404).end('Not found')
})

server.listen(3333)
