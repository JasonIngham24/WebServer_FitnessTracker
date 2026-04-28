import { Router } from "express"
import { getAll, get, add, remove } from "../models/friends"
import { Friend } from "../types/index"
import { DataEnvelope, DataListEnvelope } from "../types/dataEnvelopes"
import { getFriendActivities } from "../models/friends"

const app = Router()

app.get('/activities', async (req, res) => {
  const userId = req.session.user?.id || (req.query.user_id as string)
  if (userId) {
    const { list, count } = await getFriendActivities(Number(userId))
    const response: DataListEnvelope<any> = {
      data: list,
      isSuccess: true,
      total: count
    }
    res.send(response)
  } else {
    res.status(401).send({
      isSuccess: false,
      message: 'Not logged in'
    })
  }
})

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)

    const response: DataListEnvelope<Friend> = {
        data: list,
        isSuccess: true,
        total: count,
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