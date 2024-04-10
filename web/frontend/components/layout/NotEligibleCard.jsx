import React from 'react'
import { CalloutCard, Page } from '@shopify/polaris'
const NotEligibleCard = () => {
    return (
        <Page narrowWidth>

            <CalloutCard
                title="We apolozige that you are not eligible for subscribe payments"
                illustration="https://seed.nih.gov/images/eligibility.png"
                primaryAction={{ content: 'Checkout' }}
                secondaryAction={{ content: 'Learn more about Shopify Payments eligibility', variant: "plain", url: "https://help.shopify.com/en/manual/products/purchase-options/subscriptions/setup#eligibility-requirements" }}
            ></CalloutCard>
        </Page>

    )
}

export default NotEligibleCard
