import { Router } from "express"
import { getAll, get, create, update, remove, login as loginUser } from "../models/users"
import { User } from "../types/index"
import { DataEnvelope, DataListEnvelope } from "../types/dataEnvelopes"

const app = Router()

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)
    const response: DataListEnvelope<User> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
    })
    .get("/:id", async (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<User> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", async (req, res) => {
        const newUser = await create(req.body)
        const response: DataEnvelope<User> = {
            data: newUser,
            isSuccess: true,
        }
        res.send(response)
    })
    .post("/login", async (req, res) => {
        const { username } = req.body
        const user = await loginUser(username)
        if (user) {
            const response: DataEnvelope<User> = {
                data: user,
                isSuccess: true,
            }
            res.send(response)
        } else {
            const response: DataEnvelope<User> = {
                data: null,
                isSuccess: false,
                message: "Invalid credentials",
            }
            res.status(401).send(response)
        }
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params
        const updatedUser = await update(Number(id), req.body)
        const response: DataEnvelope<User> = {
            data: updatedUser as User,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params
        const removedUser = await remove(Number(id))
        const response: DataEnvelope<User> = {
            data: removedUser,
            isSuccess: true,
            message: `User ${removedUser.firstname} ${removedUser.lastname} has been removed.`,
        }
        res.send(response)
    })

export default app
