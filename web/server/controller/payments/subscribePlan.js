import shopify from "../../../shopify.js"
import { connection } from "../../config/ConnectionConfig.js";

export const subscribePlan = async (req, res) => {
    console.log(req.body)
    const ammout = {
        BASIC: 0.012,
        PRO: 39,
        PLUS: 99

    }
    try {
        const planName = req.body.currentPlan

        const { session } = res.locals.shopify;
        console.log(session, "---sessions")

        const client = new shopify.api.clients.Graphql({ session })
        const reponse = await client.query({
            data: {
                "query": `mutation appSubscriptionCreate($lineItems: [AppSubscriptionLineItemInput!]!, $name: String!, $returnUrl: URL!,$test:Boolean!) {
                    appSubscriptionCreate(lineItems: $lineItems, name: $name, returnUrl: $returnUrl,test:$test) {
                      appSubscription {
                        id
                        test
                      }
                      confirmationUrl
                      userErrors {
                        field
                        message
                      }
                    }
                  }`,
                "variables": {
                    "lineItems": [
                        {
                            "plan": {
                                "appRecurringPricingDetails": {
                                    "interval": "ANNUAL",
                                    "price": {
                                        "amount": ammout[req.body.currentPlan],
                                        "currencyCode": "USD"
                                    }
                                },

                            }
                        }
                    ],
                    "name": req.body.currentPlan,
                    "returnUrl": `${req.body.redirectUrl}?currentPlan=${req.body.currentPlan}`,
                    "test": true,
                    "trialDays": 1
                }
            },


        });

        if (reponse?.body?.data?.appSubscriptionCreate?.userErrors.length > 0) {
            return res.status(400).json({ status: false, message: "Failed to Subscribe Plan", error: reponse?.body?.data?.appSubscriptionCreate?.userErrors })
        }
        // console.log(session.shop, "shop", reponse?.body?.data?.appSubscriptionCreate?.appSubscription.id, "----id")

        try {
            connection.query(`UPDATE shopDetails set subscription_id  = '${reponse?.body?.data?.appSubscriptionCreate?.appSubscription.id}' WHERE shop = '${session.shop}' `, (err, result) => {
                if (err) {
                    return res.status(400).json({ status: false, message: 'Failed to Subscribe some internal issues!' })
                } else {
                    console.log(result, "---result")
                    res.status(200).json({ status: true, result: reponse.body.data })

                }

            })
        } catch (error) {
            return res.status(400).json({ status: false, message: 'Failed to Subscribe some internal issues!' })

        }



        // console.log(reponse, "-----reso")
    } catch (error) {
        res.status(400).json({ status: false, })
        console.log(error)

    }
}