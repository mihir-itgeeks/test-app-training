import shopify from "../../../shopify.js"

export const productlistController = async (req, res) => {
    const { limit } = req.body;
    try {
        const list = await shopify.api.rest.Product.all({
            session: res.locals.shopify.session,
            limit: limit ? limit : 30
        });
        res.status(200).json({ status: true, message: "Successfully Product list fetch", result: list.data })

    } catch (error) {
        res.status(400).json({ status: false, message: "Failed to  Product list fetch" })

    }
}