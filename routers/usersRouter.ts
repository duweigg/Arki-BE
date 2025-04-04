// routes/users.js
import express, { Request, Response } from 'express'
import { User, getUser } from '../utils/db'
const router = express.Router();

// Define a route
router.get('/', (req: Request, res: Response) => {
    res.send('this is user route');// this gets executed when user visit http://localhost:3000/user
});

router.get('/101', (req: Request, res: Response) => {
    res.send('this is user 101 route');// this gets executed when user visit http://localhost:3000/user/101
});

router.get('/102', (req: Request, res: Response) => {
    res.send('this is user 102 route');// this gets executed when user visit http://localhost:3000/user/102
});


router.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const user: User | undefined = getUser(id)
    if (user) {
        res.send(user)
    } else {
        res.status(404).send('User not found')
    }
})

// export the router module so that server.js file can use it
export default router;