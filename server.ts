// server.ts

import express, { Request, Response } from 'express'
import { User, getUser } from './utils/db'
import usersRouter from './routers/usersRouter'

const app = express()
const port = 3000

app.use("/users", usersRouter)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
