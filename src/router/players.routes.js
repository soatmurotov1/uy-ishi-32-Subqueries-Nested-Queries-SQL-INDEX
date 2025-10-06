import { Router } from "express";


import { findAll, findOne, createOne, updateOne, delateOne, searchOne } from "../controller/players.controller.js";


const playersRouter = Router()

playersRouter.get("/", findAll)
playersRouter.get("/:id", findOne)
playersRouter.post("/", createOne)
playersRouter.put("/:id", updateOne)
playersRouter.delate("/:id", delateOne)
playersRouter.get("/search", searchOne)



export default playersRouter