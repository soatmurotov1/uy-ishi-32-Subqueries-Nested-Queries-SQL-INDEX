import { Router } from "express";

import {findAll, findOne, createOne, updateOne, deleteOne, searchOne} from "../controller/teams.controller.js"


const teamsRouter = Router()



teamsRouter.get("/", findAll)
teamsRouter.get("/:id", findOne)
teamsRouter.post("/", createOne)
teamsRouter.put("/:id", updateOne)
teamsRouter.delete("/:id", deleteOne)
teamsRouter.get("/search", searchOne)


export default teamsRouter