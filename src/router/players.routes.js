import { Router } from "express";


import { findAll, findOne, createOne, updateOne, deleteOne, searchOne } from "../controller/players.controller.js";


const playersRouter = Router()

playersRouter.get("/", findAll)
playersRouter.get("/:id", findOne)
playersRouter.post("/", createOne)
playersRouter.put("/:id", updateOne)
playersRouter.delete("/:id", deleteOne)
playersRouter.get("/search", searchOne)



export default playersRouter