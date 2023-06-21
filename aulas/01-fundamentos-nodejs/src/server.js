
import http from 'node:http';
import {randomUUID} from 'node:crypto'
import { json } from './middlewares/json.js';
import { Database } from './database.js';

const database = new Database()

const server = http.createServer(async(request,response)=> {
    const {method,url} = request
    await json(request,response)
   if (method == 'GET' && url == '/users' ){
    const users = database.select('Users')
    return response.end(JSON.stringify(users));
   }

   else if(method == 'POST' && url == '/users'){
    const {name,email} = request.body
    const user = {
        id: randomUUID(),
        name,
        email
    }

    database.insert('Users',user)

    return response.writeHead(201).end()
   }
    return response.writeHead(404).end('Not found')
})

server.listen(3333)
