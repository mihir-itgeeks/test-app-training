import shopify from "../../../shopify.js";

export const activeSubscriptions = async(req,res)=>{
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

        res.status(200).json({status:true,message:"Success",result:response.body.data})

        // console.log(response.body.data, "----rsponse of edit")
        
    } catch (error) {
        res.status(400).json({status:false,message:"Failed",})
        
    }
}