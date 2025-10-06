import { Router } from "express";

import {findAll, findOne, createOne, updateOne, deleteOne} from "../controller/tournaments_groups.controller.js"


const tournamentGroupsRouter = Router()



tournamentGroupsRouter.get("/", findAll)
tournamentGroupsRouter.get("/:id", findOne)
tournamentGroupsRouter.post("/", createOne)
tournamentGroupsRouter.put("/:id", updateOne)
tournamentGroupsRouter.delete("/:id", deleteOne)


export default tournamentGroupsRouter