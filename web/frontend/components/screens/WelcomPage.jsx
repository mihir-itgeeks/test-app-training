import React, { useEffect, useState } from 'react'
import { BlockStack, CalloutCard, Page, Text } from '@shopify/polaris'
export default function WelcomPage() {

    const [step,setStep] = useState(0)

    return (
        <Page narrowWidth>
           
             {step === 0 && <CalloutCard
                    title="Welcome to our Training App"
                    illustration="https://images.squarespace-cdn.com/content/v1/601bb91eb4b86828b4d6cf0f/1612729292590-C3I6CP9C272T4D2KDMOP/Copy+of+Welcome+Long.png"
                    primaryAction={{ content: 'Start' ,onAction:()=>{
                        setStep(step+1)
                    }}}
                >
                </CalloutCard>}
            
        </Page>
    )
}


