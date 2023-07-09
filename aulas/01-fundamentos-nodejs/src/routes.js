
import { Database } from "./database.js";
const database = new Database()
import { buildRoutePath } from "./utils/build-route-path.js";
import { v4 as uuidv4 } from 'uuid';

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req,res) => {
            const users = database.select('Users')
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req,res) => {
            const {name,email} = req.body
            const user = {
                id: uuidv4(),
                name,
                email
            }
        
            database.insert('Users',user)
        
            return res.writeHead(201).end()
           }
    },
    {
        method: 'DELETE',
        path:buildRoutePath('/users/:id'),
        handler: (req,res) =>{
          return res.end()  
        },
    }
]