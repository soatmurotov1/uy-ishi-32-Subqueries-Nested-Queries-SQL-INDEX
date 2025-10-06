import client from "../config/db.js";




export const findAll = async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM tournaments_groups`);
    return res.status(200).json({
      message: "Barcha turnir guruhlari topildi",
      groups: result.rows,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in the server" });
  }
};




export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      `SELECT * FROM tournaments_groups WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Guruh topilmadi" });
    }

    return res.status(200).json({
      message: "Guruh topildi",
      group: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "erroir in the serber" });
  }
};





export const createOne = async (req, res) => {
  try {
    const { group_name, tournament_id } = req.body;

    if (!group_name || !tournament_id) {
      return res.status(400).json({
        message: "group_name va tournament_id kiritilishi shart",
      });
    }

    const query = `INSERT INTO tournaments_groups (group_name, tournament_id VALUES ($1, $2) RETURNING *`
    const result = await client.query(query, [group_name, tournament_id]);

    return res.status(201).json({
      message: "Yangi guruh yaratildi",
      group: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in the server" });
  }
};





export const updateOne = async (req, res) => {
  try {
    const { id } = req.params
    const { group_name, tournament_id } = req.body

    const result = await client.query(
      ` UPDATE tournaments_groups SET group_name = $1, tournament_id = $2 WHERE id = $3 RETURNING *`,
      [group_name, tournament_id, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Group not found" });
    }

    return res.status(200).json({
      message: "Guruh ma'lumotlari yangilandi",
      group: result.rows[0]
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error in the server" })
  }
};





export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM tournaments_groups WHERE id=$1 RETURNING *`
    const deleted = await client.query(query, [id]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "tournaments groups not found" })
    }

    return res.status(200).json({ message: "tournaments groups deleted", tournaments_groups: deleted.rows[0] })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ 
      message: "Server error" 
    })
  }
};
