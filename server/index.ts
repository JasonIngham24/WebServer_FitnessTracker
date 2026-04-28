import { config } from "dotenv"
config()
import express from "express"
import cors from "cors"
import session from "express-session"
import usersController from "./controllers/users"
import activitiesController from "./controllers/activities"
import friendsController from "./controllers/friends"
import { DataEnvelope } from "./types/dataEnvelopes"


const PORT = process.env.PORT ?? 3000
const SERVER = process.env.SERVER ?? "localhost"
const STATIC_DIR = process.env.STATIC_DIR ?? "client/dist"

const app = express()

///////// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:5173',
    credentials: true,
  }),
)
    .use(express.json()) // Middleware to parse JSON request bodies
    .use(session({
        secret: process.env.SESSION_SECRET ?? "secret",
        resave: false,
        saveUninitialized: true,
    }))

///////// Routes
app.use(express.static(STATIC_DIR))
    .use("/api/v1/users", usersController)
    .use("/api/v1/activities", activitiesController)
    .use("/api/v1/friends", friendsController)

//////// Error handling
app.use(
    (
        err: Error,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
    ) => {
        console.error(err)

        const response: DataEnvelope<null> = {
            data: null,
            isSuccess: false,
            message: err.message ?? "An error occurred",
        }

        res.status((err as any).status ?? 500).send(response)
    },
)

app.listen(PORT, () => {
    console.log(`Server is running on http://${SERVER}:${PORT}`)
})

console.log("Listening for requests...")