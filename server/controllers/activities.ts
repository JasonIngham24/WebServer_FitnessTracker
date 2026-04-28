import { Router } from "express"
import { getAll, get, create, update, remove } from "../models/activities"
import { Activity } from "../types/index"
import { DataEnvelope, DataListEnvelope } from "../types/dataEnvelopes"

const app = Router()

app.get("/", async (req, res) => {
    const { list, count } = await getAll(req.query)

    const response: DataListEnvelope<Activity> = {
        data: list,
        isSuccess: true,
        total: count,
    }
    res.send(response)
    }) 
    .get("/:id", async (req, res) => {
        const { id } = req.params
        const response: DataEnvelope<Activity> = {
            data: await get(Number(id)),
            isSuccess: true,
        }
        res.send(response)
    })

    .post("/", async (req, res) => {
        const newActivity = await create(req.body)
        const response: DataEnvelope<Activity> = {
            data: newActivity,
            isSuccess: true,
        }
        res.send(response)
    })
    .patch("/:id", async (req, res) => {
        const { id } = req.params
        const updatedActivity = await update(Number(id), req.body)
        const response: DataEnvelope<Activity> = {
            data: updatedActivity,
            isSuccess: true,
        }
        res.send(response)
    })
    .delete("/:id", async (req, res) => {
        const { id } = req.params
        const removedActivity = await remove(Number(id))
        const response: DataEnvelope<Activity> = {
            data: removedActivity,
            isSuccess: true,
            message: `Activity ${removedActivity.activity} has been removed.`,
        }
        res.send(response)
    })

export default app
