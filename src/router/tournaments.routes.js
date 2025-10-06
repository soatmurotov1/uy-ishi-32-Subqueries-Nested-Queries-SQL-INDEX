import { Router } from "express";

import {findAll, findOne, createOne, updateOne, deleteOne} from "../controller/tournaments.controller.js"


const tournamentsRouter = Router()



tournamentsRouter.get("/", findAll)
tournamentsRouter.get("/:id", findOne)
tournamentsRouter.post("/", createOne)
tournamentsRouter.put("/:id", updateOne)
tournamentsRouter.delete("/:id", deleteOne)


export default tournamentsRouter