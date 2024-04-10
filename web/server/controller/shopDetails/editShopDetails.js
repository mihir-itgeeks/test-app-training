import { connection } from '../../config/ConnectionConfig.js'
export const editShopDetails = async (req, res) => {
    const data = req.body
    console.log(data,"----dat")
    try {
        connection.query(`UPDATE shopDetails SET ${Object.keys(data)[0]} = '${Object.values(data)[0]}' WHERE name = 'DevelopmentCheck' `, (err, result) => {
            if (err) {
                res.status(400).json({ status: false, message: "Failed To Edit 1" })

            }else{
                res.status(200).json({ status: true, message: "Successfully Done!" })

            }
            
        })
    } catch (error) {
        console.log(error,"---errr")
        res.status(400).json({ status: false, message: "Failed To Edit" })
    }
}