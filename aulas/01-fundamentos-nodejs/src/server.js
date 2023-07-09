
import http from 'node:http';
import {randomUUID} from 'node:crypto'
import { json } from './middlewares/json.js';
import { routes } from './routes.js';

const server = http.createServer(async(request,response)=> {
    const {method,url} = request
    await json(request,response)

    const route = routes.find(route => {
        return route.method === method && route.path.test(url)
    })

    if (route){
       const routParams = request.url.match(route.path)
       console.log(routParams)
       return route.handler(request,response)
    }

    return response.writeHead(404).end('Not found')
})

server.setTimeout(600000);
server.listen(3333)
