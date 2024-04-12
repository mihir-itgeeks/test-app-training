import shopify from "../../../shopify.js"
import { connection } from "../../config/ConnectionConfig.js";

export const updateSubscribeController = async (req, res) => {
    try {
        const { session } = res.locals.shopify;
        const client = new shopify.api.clients.Graphql({ session });
        const response = await client.query({
            data: ` query {currentAppInstallation {
                activeSubscriptions {
                  id
                  name
                  test
                  createdAt

                }
             }
            }`
        });


        console.log(response.body.data, "----rsponse of edit")
        const PlanName = [
            'BASIC',
            'PRO',
            'PLUS'
        ]

        let reqPlanNameError = "";

        const exist = PlanName.filter((ele, index) => { return ele === req.body.currentPlan });
        console.log(exist, "---exist plan")
        if (exist.length === 0) {
            return res.status(400).json({ status: false, message: "invalid plan select on of this 'BASIC','PRO','PLUS'" })
        }

        // const { session } = res.locals.shopify;
        // const response = await shopify.api.rest.ApplicationCharge.all({
        //     session: session
        // });

        connection.query(`UPDATE shopDetails SET charge_id = '${req.body.charge_id}',currentPlan ='${req.body.currentPlan}' WHERE shop = '${session.shop}'`, (err, result) => {
            if (err) {
                res.status(400).json({ status: false, message: "Failed to update subscription" })

            } else {
                res.status(200).json({ status: true, message: "Successfully Done Subscription", result: { activePlan: req.body.currentPlan ,status:response.body.data} })
            }
        })
    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to update subscription" })

    }
}