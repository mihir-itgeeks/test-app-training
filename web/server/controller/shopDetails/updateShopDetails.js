import shopify from "../../../shopify.js"
import { connection } from "../../config/ConnectionConfig.js";

export const updateShopDetails = async (req, res) => {
    try {
        const shopData = await shopify.api.rest.Shop.all({
            session: res.locals.shopify.session
        });
        if (shopData) {
            try {
                connection.query("CREATE TABLE IF NOT EXISTS shopDetails (id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255), customer_email VARCHAR(255),language VARCHAR(255),tutorial INT,currentPlan VARCHAR(225),charge_id VARCHAR(225),subscription_id VARCHAR(225))", (err, result) => {
                    if (err) {
                        res.status(400).json({ status: false, message: "Failed to Create " })
                    }
                    else {
                        console.log(result);
                        connection.query(`SELECT * FROM shopDetails WHERE name = '${shopData.data[0].name}'`, (err, result) => {
                            if (err) throw err
                            if (result.length === 0) {
                                connection.query(`INSERT INTO shopDetails (name,customer_email,language,tutorial,currentPlan,charge_id,subscription_id) VALUES ('${shopData.data[0].name}','${shopData.data[0].customer_email}','en',0,'free',null,null)`,(err,result)=>{
                                    if(err)throw err;
                                });
                                res.status(200).json({ status: true, message: "Created! " ,})
                            }else{
                                res.status(200).json({ status: true, message: "Already Created! ",result:shopData.data })
                            }
                        })


                    }
                })
            } catch (error) {
                res.status(400).json({ status: false, message: "Failed to Create " })

            }
        }
        console.log(shopData, "------details");
        // res.status(200).json({ status: true, message: "Update Shop", result: shopData.data });
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed!", });

    }
}