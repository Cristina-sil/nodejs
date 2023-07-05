
import { Database } from "./database.js";
const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: '/users',
        handler: (req,res) => {
            const users = database.select('Users')
            return res.end(JSON.stringify(users));
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req,res) => {
            const {name,email} = request.body
            const user = {
                id: randomUUID(),
                name,
                email
            }
        
            database.insert('Users',user)
        
            return res.writeHead(201).end()
           }
    }
]