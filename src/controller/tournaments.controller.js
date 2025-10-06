import client from "../config/db.js";




export const findAll = async (req, res) => {
  try {
    const result = await client.query(`SELECT * FROM tournaments`)
    return res.status(200).json({
      message: "Barcha turnirlar topildi",
      tournaments: result.rows,
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Serverda xatolik"
    });
  }
}



export const findOne = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await client.query(
      `SELECT * FROM tournaments WHERE id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "topilmadi" });
    }

    return res.status(200).json({
      message: "Turnir topildi",
      tournament: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Serverda xatolik"
    });
  }
};





export const createOne = async (req, res) => {
  try {
    const { tournament_name, location, start_date, end_date } = req.body;

    if (!tournament_name || !location || !start_date || !end_date) {
      return res.status(400).json({
        message: "toldirish shart (tournament_name, location, start_date, end_date)",
      });
    }

    const query = `INSERT INTO tournaments (tournament_name, location, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *`
    const result = await client.query(query, [
      tournament_name,
      location,
      start_date,
      end_date,
    ]);

    return res.status(201).json({
      message: "Yangi turnir yaratildi",
      tournament: result.rows[0],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "error in the serve"
    });
  }
};





export const updateOne = async (req, res) => {
  try {
    const { id } = req.params;
    const { tournament_name, location, start_date, end_date } = req.body;

    const result = await client.query(
      `UPDATE tournaments SET tournament_name = $1, location = $2, start_date = $3, end_date = $4 WHERE id = $5 RETURNING *`
      [tournament_name, location, start_date, end_date, id]
    )

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Turnir topilmadi" });
    }

    return res.status(200).json({
      message: "Turnir muvaffaqiyatli yangilandi",
      tournament: result.rows[0],
    });
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: "Serverda xatolik"
    });
  }
}




export const deleteOne = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM tournaments WHERE id=$1 RETURNING *`
    const deleted = await client.query(query, [id]);

    if (deleted.rows.length === 0) {
      return res.status(404).json({ message: "tournaments not found" })
    }

    return res.status(200).json({ message: "tournaments deleted", tournaments: deleted.rows[0] })
  } catch (err) {
    console.log(err);
    return res.status(500).json({ 
      message: "Server error" 
    })
  }
};