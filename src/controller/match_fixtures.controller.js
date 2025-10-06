import client from "../config/db.js";


export const findAll = async (req, res) => {
  try {
    const query = `SELECT * FROM match_fixtures`
    const matchAll = await client.query(query)
    return res.status(200).json({
      message: "Barcha oyinlar topildi",
      match_fixtures: matchAll.rows
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in the server", error: err.message })
  }
};




export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `SELECT * FROM match_fixtures WHERE id = $1`
    const searchId = await client.query(query, [id]);

    if (searchId.rows.length === 0) {
      return res.status(404).json({ message: "Match not found" })
    }

    return res.status(200).json({
      message: "Match topildi",
      match_fixture: searchId.rows[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error in the server", error: err.message })
  }
};




export const createOne = async (req, res) => {
  try {
    const { match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id } = req.body

    if (!match_date || !venue || !home_team_id || !away_team_id || !home_score || !away_score || !tournament_id) {
      return res.status(400).json({ message: "The entered data is incorrect" })
    }

    const body = [match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id]
    const query = `
      INSERT INTO match_fixtures
      (match_date, venue, home_team_id, away_team_id, home_score, away_score, tournament_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING * `;
    const newMatch = await client.query(query, body)
    return res.status(201).json({
      message: "New match created successfully",
      match_fixture: newMatch.rows[0]
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err.message })
  }
};



export const updateOne = async (req, res) => {
  try {
    const { id } = req.params
    const data = []
    const values = []
    let idx = 1

    for (const [key, value] of Object.entries(req.body)) {
      data.push(`${key}=$${idx}`)
      values.push(value)
      idx++;
    }

    values.push(id);
    const query = `update match_fixtures set ${data.join(", ")} where id=$${idx} RETURNING *`
    const updated = await client.query(query, values)

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Match not found" })
    }

    return res.status(200).json({ message: "Match updated successfully", match_fixture: updated.rows[0] })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err.message })
  }
};




export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM match_fixtures WHERE id=$1 RETURNING *`
    const deleted = await client.query(query, [id]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Match not found" })
    }

    return res.status(200).json({ message: "Match deleted", match_fixture: deleted.rows[0] })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error", error: err.message })
  }
};
