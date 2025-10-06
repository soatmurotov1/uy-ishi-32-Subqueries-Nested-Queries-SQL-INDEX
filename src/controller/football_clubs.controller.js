import client from "../config/db.js"



export const findAll = async (req, res) => {
    try {
        const query = `Select * from football_clubs`
        const allClubs = await client.query(query)
        console.log(allClubs.rows)
        return res.status(200).json({
            message: `Futbol clubdagi barcha userlar`,
            football_clubs: allClubs.rows
        })
    } catch (err) {
        console.log(err)
        return res.status(501).json({
            message: "error in the server ",
            err: err.message
        })
    }
}
export const findOne = async (req, res) => {
    try {
        const { id } = req.params
        const query = `Select * from football_clubs where id = $1`
        const searchedId = await client.query(query, [id])

        if (searchedId.rows.length === 0) {
            return res.status(404).json({ message: `Not found id` })
        }
        return res.status(200).json({
            message: `User topildi`,
            football_club: searchedId.rows[0]
        })
    } catch (err) {
        console.log(err) 
        return res.status(501).json({
            message: "err in the server",
            err: err.message
        })
    }
}
export const updateOne = async (req, res) => {
    try {
        const { id } = req.params
        const data = []
        const values = []
        let idx = 1
        for (const [key, value] of Object.entries(req.body)) {
            data.push(`${key}=$${idx}`)
            values.push(value)
            idx++
        }
        values.push(req.params.id)
        
        const query = `Update football_clubs set ${data.join(", ")} where id = $${idx} returning *`
        const updatedClub = await client.query(query, values)
        if (updatedClub.rows.length === 0) {
           return res.status(404).json({ message: `Not found`})
        }
        return res.status(200).json({
            message: `Successfully updated a club`,
            club: updatedClub.rows[0]
        })}
    catch (err) {
        console.log(err)
        return res.status(501).json({
            message: `SERVER ERr!`,
            err: err.message
        })
    }
}
export const createOne = async (req, res) => {
    try {
        const { club_name, city, country, founded_year} = req.body
        if (club_name && city && country && founded_year) {
            const body = [ club_name, city, country, founded_year]
            const query = `Insert into football_clubs ( club_name, city, country, founded_year) values ($1,$2, $3, $4) returning *`
            const newClub = await client.query(query, body)
            console.log(newClub.rows[0])
            return res.status(201).json({
                message: `New club created`,
                club: newClub.rows[0]
            })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({
            message: `SERVER ERr!`,
            err: err.message
        })
    }
}
export const deleteOne = async (req, res) => {
    try {
        const { id } = req.params
        const query = `delete from football_clubs where id = $1 returning *`
        const deletedClub = await client.query(query, [id])
        if (deletedClub.rows.length === 0) {
            return res.status(404).json({ message: `Not found such an id of a club` })
        }
        return res.status(200).json({ message: `Club deleted`, club: deletedClub.rows[0] })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `ER in the server` })
    }
}
export const searchOne = async (req, res) => {
    try {
        const { page = 1, limit = 10, filter = "" } = req.query
        if (filter) {
            const offset = (page - 1) * limit
            const values = [`%${filter}%`, offset, limit]
            const query = `Select * from football_clubs where club_name ilike $1 or city ilike $1 or country ilike $1 offset $2 limit $3`
            const result = await client.query(query, values)
            if (result.rows.length === 0) {
                return res.status(404).json({
                    message: `Not found football clubs`,
                    filter: filter
                })
            }
            return res.status(200).json({
                message:
                    `Not search`,
                total: result.rows.length,
                page,
                limit,
                result: result.rows
            })
        }
        else {
            const offset = (page - 1) * limit
            const query = `Select * from football_clubs offset $1 limit $2`
            const result = await client.query(query, [offset, limit])
            return res.status(200).json({ 
                message: "All clubs", 
                result: result.rows 
            })
        }

    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: `error in the server` })
    }
}



































































