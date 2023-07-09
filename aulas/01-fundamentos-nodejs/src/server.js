
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
       request.params = {...routParams.groups}
       return route.handler(request,response)
    }

    return response.writeHead(404).end('Not found')
})

server.listen(3333)
