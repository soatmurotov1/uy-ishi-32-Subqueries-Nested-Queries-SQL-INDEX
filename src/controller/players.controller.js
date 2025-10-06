import client from "../config/db.js";



export const findAll = async (req, res) => {
  try {
    const query = `SELECT * FROM players`
    const playerAll = await client.query(query)
    return res.status(200).json({
      message: `All players found`,
      players: playerAll.rows
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    });
  }
};



export const findOne = async (req, res) => {
  try {
    const { id } = req.params
    const query = `SELECT * FROM players WHERE id = $1`
    const result = await client.query(query, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" })
    }

    return res.status(200).json({
      message: "Player found",
      player: result.rows[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    })
  }
};



export const createOne = async (req, res) => {
  try {
    const { name, position, nationality, age, club_id } = req.body

    if (!name || !position || !nationality || !age || !club_id) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const values = [name, position, nationality, age, club_id];
    const query = `INSERT INTO players (name, position, nationality, age, club_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`
    const newPlayer = await client.query(query, values)

    return res.status(201).json({
      message: "Player created successfully",
      player: newPlayer.rows[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    });
  }
};



export const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const data = [];
    const values = [];
    let idx = 1;

    for (const [key, value] of Object.entries(req.body)) {
      data.push(`${key}=$${idx}`)
      values.push(value)
      idx++
    }

    values.push(id);
    const query = `UPDATE players SET ${data.join(", ")} WHERE id=$${idx} RETURNING *`
    const updated = await client.query(query, values)

    if (updated.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" })
    }

    return res.status(200).json({
      message: "Player updated successfully",
      player: updated.rows[0]
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    });
  }
};



export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM players WHERE id=$1 RETURNING *`
    const deleted = await client.query(query, [id]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "Player not found" })
    }

    return res.status(200).json({
      message: "Player deleted",
      player: deleted.rows[0]
    })
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    });
  }
};



export const searchOne = async (req, res) => {
  try {
    const { page = 1, limit = 10, filter = "" } = req.query
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const offset = (pageNum - 1) * limitNum


    if (filter) {
      query = `SELECT * FROM players WHERE name ILIKE $1 OR position ILIKE $1 OR nationality ILIKE $1 OFFSET $2 LIMIT $3`
      values = [`%${filter}%`, offset, limitNum];
    } else {
      query = `SELECT * FROM players OFFSET $1 LIMIT $2`
      values = [offset, limitNum]
    }

    const result = await client.query(query, values)

    return res.status(200).json({
      message: "Search result",
      total: result.rows.length,
      page: pageNum,
      limit: limitNum,
      players: result.rows
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in the server`
    });
  }
};
