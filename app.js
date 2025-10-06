import express from "express"


import tournamentsRouter from "./router/tournaments.routes.js"
import playersRouter from "./router/players.routes.js"
import tournamentGroupsRouter from "./router/tournament_groups.routes.js"
import matchFixturesRouter from "./router/match_fixtures.routes.js"
import footballClubsRouter from "./router/football_clubs.routes.js"
import teamsRouter from "./router/teams.routes.js"

const app = express()
app.use(express.json())


app.use("/tournaments", tournamentsRouter)
app.use("/players", playersRouter)
app.use("/tournament-groups", tournamentGroupsRouter)
app.use("/match-fixtures", matchFixturesRouter)
app.use("/football-clubs", footballClubsRouter)
app.use("/teams", teamsRouter)



app.listen(3000, ()=>{
    console.log(`Server running om port 3000`)
})