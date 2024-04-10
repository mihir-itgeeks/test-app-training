import shopify from "../../shopify.js";


export async function authmiddleware(req,res,next){
    const session = res.locals?.shopify?.session
    let shop = req.query.shop || session.shop;
    let storeName = await shopify.config.sessionStorage.findSessionsByShop(shop);
    console.log(storeName, "---current session");
    if (!shop) {
        return res.status(400).json({status:false,message:"Bad Request"})
    }
    next();
        
}