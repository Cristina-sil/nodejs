
import { Database } from "./database.js";
const database = new Database()
import { buildRoutePath } from "./utils/build-route-path.js";
import { v4 as uuidv4 } from 'uuid';

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req,res) => {
            const {search} = req.query

            const users = database.select('Users',search?{
                name: search,
                email:search,
            }: null)

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
          const {id} = req.params
          database.delete('Users',id)

          return res.writeHead(204).end()
        },
    },
    {
        method: 'PUT',
        path:buildRoutePath('/users/:id'),
        handler: (req,res) =>{
          const {id} = req.params

          const { name, email } = req.body

          database.update('Users', id, {
            name, 
            email,
          })

          return res.writeHead(204).end()
        },
    }
]