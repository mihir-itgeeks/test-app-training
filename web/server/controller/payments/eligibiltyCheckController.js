import shopify from "../../../shopify.js";

export const eligibiltyCheckController = async (req, res) => {

    // console.log(res.locals.shopify, "sessions")
    const { session } = res.locals.shopify;
    try {
        const client = new shopify.api.clients.Graphql({ session });
        const data = await client.query({
            data: `query {
        shop {
          name
          features {
             eligibleForSubscriptions
           }
        }
    }`,
        });
        res.status(200).json({ status: true, result: data?.body?.data?.shop?.features })

    } catch (error) {
        res.status(400).json({ status: false, error: error })
    }



}