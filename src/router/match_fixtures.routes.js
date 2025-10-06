import { Router } from "express";

import {findAll, findOne, createOne, updateOne, deleteOne, searchOne} from "../controller/match_fixtures.controller.js"


const matchFixturesRouter = Router()



matchFixturesRouter.get("/", findAll)
matchFixturesRouter.get("/:id", findOne)
matchFixturesRouter.post("/", createOne)
matchFixturesRouter.put("/:id", updateOne)
matchFixturesRouter.delete("/:id", deleteOne)
matchFixturesRouter.get("/search", searchOne)


export default matchFixturesRouter