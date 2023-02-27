import { Database } from "./database.js";
import { randomUUID } from 'node:crypto'

const database = new Database();

export const routes = [
    {
        method: 'GET',
        path: '/tasks',
        handler: (req, res) => {

            const tasks = database.select('tasks')
            
            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: '/tasks',
        handler: (req, res) => {
            const data = req.body

            const task = {
                id: randomUUID(),
                title: data.title,
                description: data.description,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
                completed_at: null,
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    }
]