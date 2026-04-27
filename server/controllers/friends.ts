import { Router } from "express"
import { getAll, get, add, remove } from "../models/friends"
import { Friend } from "../types/index"
import { DataEnvelope, DataListEnvelope } from "../types/dataEnvelopes"

const app = Router()

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)

    const response: DataListEnvelope<Friend> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
})
    .get("/count", async (req, res) => {
        const { count } = await getAll(req.query)
        const response: DataEnvelope<{ count: number }> = {
            data: { count },
            isSuccess: true,
        }
        res.send(response)
    })
    .get("/:id", async (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<Friend> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", async (req, res) => {
        const newFriend = await add(req.body.user_id, req.body.friend_id)
        const response: DataEnvelope<Friend> = {
            data: newFriend,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params
        const removedFriend = await remove(Number(id))
        const response: DataEnvelope<Friend> = {
            data: removedFriend,
            isSuccess: true,
            message: `Friend ${removedFriend.friend_id} has been removed.`,
        }
        res.send(response)
    })

export default app