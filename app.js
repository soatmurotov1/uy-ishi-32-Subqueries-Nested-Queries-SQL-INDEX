import express from "express";

import tournamentsRouter from "./src/router/tournaments.routes.js";
import playersRouter from "./src/router/players.routes.js";
import tournamentGroupsRouter from "./src/router/tournaments_groups.routes.js";
import matchFixturesRouter from "./src/router/match_fixtures.routes.js";
import footballClubsRouter from "./src/router/football_clubs.routes.js";
import teamsRouter from "./src/router/teams.routes.js";

const app = express();
app.use(express.json());

app.use("/tournaments", tournamentsRouter);
app.use("/players", playersRouter);
app.use("/tournament-groups", tournamentGroupsRouter);
app.use("/match-fixtures", matchFixturesRouter);
app.use("/football-clubs", footballClubsRouter);
app.use("/teams", teamsRouter);

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
