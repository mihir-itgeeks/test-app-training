
import { connection } from "../../config/ConnectionConfig.js"

export const getShopDetails = async (req, res) => {
    try {
      
        connection.query("SELECT * FROM shopDetails", (err, result) => {
            if (err) {
                console.log(err)
                return res.status(400).json({ status: false, message: "Failed to Fetch!" });
            } else {

                return res.status(200).json({ status: true, message: "Successfully Fetched!", result: result })
            }
        });
    } catch (error) {
        return res.status(400).json({ status: false, message: "Failed to Fetch!" });

    }
}