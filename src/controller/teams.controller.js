import client from "../config/db.js";

export const findAll = async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM teams`)
    return res.status(200).json({
      message: "Barcha jamoalar topildi",
      teams: result.rows,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverda xatolik" })
  }
}



export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(`SELECT * FROM teams WHERE id=$1`, [id])

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Jamoa topilmadi" })
    }

    return res.status(200).json({
      message: "Jamoa topildi",
      team: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverda xatolik" })
  }
};

export const createOne = async (req, res) => {
  try {
    const { team_name, city, country, founded_year } = req.body

    if (!team_name || !city || !country || !founded_year) {
      return res.status(400).json({ message: "Malumot toliq emas" })
    }

    const query = `INSERT INTO teams (team_name, city, country, founded_year) VALUES ($1, $2, $3, $4) RETURNING *`

    const result = await client.query(query, [team_name, city, country, founded_year])

    return res.status(201).json({
      message: "Yangi jamoa qoshildi",
      team: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Serverda xatolik" });
  }
};

export const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name, city, country, founded_year } = req.body

    const result = await client.query(
      `UPDATE teams SET team_name=$1, city=$2, country=$3, founded_year=$4 WHERE id=$5 RETURNING *`
      [team_name, city, country, founded_year, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "team not found" })
    }

    return res.status(200).json({
      message: "Team updatwd",
      team: result.rows[0],
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Serverda xatolik" })
  }
};



export const delateOne = async (req, res) => {
  try {
    const { id } = req.params
    const query = `delete from teams where id = $1 returning *`
    const deleteId = await client.query(query, [id])

    if(deleteId.rows.length === 0) {
      return res.status(404).json({
        message: `Team not found`
      })
    }
    
    return res.status(200).json({
      message: "Team deleted",
      player: deleteId.rows[0]
    })
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: `Error in  hte server`
    })
    
  }
}