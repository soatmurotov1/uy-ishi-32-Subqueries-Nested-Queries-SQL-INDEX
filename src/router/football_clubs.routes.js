import { Router } from "express"
import {findAll, findOne, updateOne, deleteOne, searchOne} from "../controller/football_clubs.controller.js"
import { createOne } from "../controller/tournaments.controller.js"

const footballClubsRouter = Router()







footballClubsRouter.get("/", findAll)
footballClubsRouter.get("/:id", findOne)
footballClubsRouter.put("/:id", updateOne)
footballClubsRouter.post("/", createOne)
footballClubsRouter.delete("/:id", deleteOne)
footballClubsRouter.get("/search", searchOne)

export default footballClubsRouter

