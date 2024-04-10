import { connection } from "../../config/ConnectionConfig.js"

export const customerlistController = async (req, res) => {

    const { limit, offset } = req.body;

    const Q1 = `SELECT * FROM customerlist ${limit ? 'LIMIT ' + limit : ''} ${offset ? 'OFFSET ' + offset : ''}`
    try {
        connection.query(Q1, (err, result) => {
            if (err) {
                res.status(400).json({ status: false, message: "Failed to Fetch List!" });
            } else if (result.length > 0 || result.length=== 0) {
                res.status(200).json({ status: true, message: "Successfully Fetched!" ,result:result});
                console.log(result,"------result")
            }
        })
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to Fetch List!" });

    }
}