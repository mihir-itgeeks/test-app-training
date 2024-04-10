import { connection } from "../../config/ConnectionConfig.js";

export const deleteCustomerController = async (req, res) => {
    const { id } = req.body;
    if(!id){
        return res.status(400).json({ status: false, message: "Failed To delete Customer without Id " })
    }
    try {
        connection.query(`DELETE FROM customerlist WHERE id = '${id}'`, (err, result) => {
            if (err) {
                return res.status(400).json({ status: false, message: "Failed To delete Customer " })
            } else {
                if (result) {
                    console.log(result)
                    return res.status(200).json({ status: true, message: "Successfully Delete Customer", result: result })
                }

                // res.status(400).json({ status: false, message: "Failed To delete Customer " })
            }
        })
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed To delete Customer " })

    }
}