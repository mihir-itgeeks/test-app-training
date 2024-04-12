import shopify from '../../../shopify.js';
import { connection } from '../../config/ConnectionConfig.js'
export const editShopDetails = async (req, res) => {
    const data = req.body
    // console.log(data, "----dat")
    const { session } = res.locals.shopify;
    try {
        const shopData = await shopify.api.rest.Shop.all({
            session: res.locals.shopify.session
        });
        


        if (shopData) {
            connection.query(`UPDATE shopDetails SET ${Object.keys(data)[0]} = '${Object.values(data)[0]}' WHERE name = '${shopData.data[0].name}' `, (err, result) => {
                if (err) {
                    return res.status(400).json({ status: false, message: "Failed To Edit 1" })

                } else {
                    return res.status(200).json({ status: true, message: "Successfully Done!" })

                }

            })
        } else {
            return res.status(400).json({ status: false, message: "No SHOP Detiails Fetched!" })

        }

    } catch (error) {
        console.log(error, "---errr")
        res.status(400).json({ status: false, message: "Failed To Edit" })
    }
}