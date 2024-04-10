import React, { useEffect, useState } from 'react'
import { BlockStack, Button, CalloutCard, Card, Box, Checkbox, Image, InlineGrid, InlineStack, Link, Page, Text } from '@shopify/polaris'
import { document } from '../../assets';
import { useAuthenticatedFetch, useNavigate } from '@shopify/app-bridge-react'
export default function WelcomPage({ setTutorial }) {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [checked, setChecked] = useState(false);
    const [loading, setLoading] = useState(false);
    let fetch = useAuthenticatedFetch()

    async function updateTutorial() {
        setLoading(true);
        const config = {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({ tutorial: 1 })
        }
        fetch("/api/shop/edit", config)
            .then(res => res.json())
            .then(res => {
                setLoading(false);
                if (res.status) {

                    setTimeout(() => {
                      
                        navigate("/plan");
                        setTutorial(1)
                    }, 500);
                }
                console.log(res, "---res tutorial")
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            })

    }


    return (<>
        <Page narrowWidth>
            {step === 0 && <CalloutCard
                title=<Text as='h1' variant='headingLg'>Welcome to Easy subscription App</Text>

                illustration="https://images.squarespace-cdn.com/content/v1/601bb91eb4b86828b4d6cf0f/1612729292590-C3I6CP9C272T4D2KDMOP/Copy+of+Welcome+Long.png"
                primaryAction={{
                    content: 'Start', onAction: () => {
                        setStep(step + 1)
                    }
                }}
            >
                <Text as='p' variant='bodySm'>Smoothest App to sell subscription products directly through your Shopify checkouts. Unlock a world of possibilities with our subscription service.</Text>
            </CalloutCard>}
        </Page>
        {
            step === 1 &&
            <Box width='800px'>
                <Card>
                    <InlineStack gap={200} align='space-between' blockAlign='center'>
                        <BlockStack inlineAlign='baseline' align='center' gap={300}>
                            <Text as='h1' variant='headingLg'>We protect customer data and fields!</Text>
                            <Checkbox

                                label={
                                    <Box width='450px'  >
                                        <Text alignment='start'> By clicking the "Let's go!" button, you agree to our Terms & Conditions and that you have read our Privacy Policy. <Link url='https://easysubscription.io/privacy-policy/'>More Detail.</Link>
                                        </Text>
                                    </Box>
                                }
                                checked={checked}
                                onChange={setChecked}>

                            </Checkbox>
                            <Button onClick={() => { setStep(step + 1) }} variant='primary' disabled={!checked}>Let's go!</Button>
                        </BlockStack>

                        <Image source={document} width={80} height={80}></Image>
                    </InlineStack>

                </Card>
            </Box>}
        {step === 2 &&
            <Page fullWidth>
                <BlockStack gap={'800'} align='center' inlineAlign='center'>
                    <Text as='h1' variant='headingLg' >Ready to begin your Subscription Journey?</Text>
                    <InlineGrid columns={{ "lg": 3, "md": 3, "sm": 2, "xs": 1 }} gap={300} alignItems='center'>
                        <Card>
                            <BlockStack gap={300} inlineAlign='center' align='center'>
                                <Text as='h1' variant='headingMd' alignment='center'>Need assistance setting up the app? Let's connect.</Text>
                                <Image source="https://app.easysubscription.io/assets/assistance.5c6b27ff.svg"></Image>
                                <Box borderWidth='0165' background='bg-inverse'>
                                    <InlineStack>
                                        <Button variant='' ><Text tone='text-inverse'>Connect With support</Text></Button>

                                    </InlineStack>
                                </Box>
                            </BlockStack>
                        </Card>
                        <Card>
                            <BlockStack gap={300} inlineAlign='center' align='center'>
                                <Text as='h1' variant='headingMd' alignment='center'>Already selling subscriptions? Require migration assistance?</Text>
                                <Image source="https://app.easysubscription.io/assets/migration.1d67ef8d.svg"></Image>
                                <Box borderWidth='0165' background='bg-inverse'>
                                    <InlineStack>
                                        <Button variant='' ><Text tone='text-inverse'>Chat With us</Text></Button>

                                    </InlineStack>
                                </Box>
                            </BlockStack>
                        </Card>
                        <Card>
                            <BlockStack gap={300} inlineAlign='center' align='center'>
                                <Text as='h1' variant='headingMd' alignment='center'>You're planning to tackle the setup on your own?</Text>
                                <Image source="https://app.easysubscription.io/assets/letsgetstart.a569dcaf.svg"></Image>
                                <Box borderWidth='0165'>
                                    <InlineStack>
                                        <Button variant='' disabled={loading} loading={loading} onClick={updateTutorial}><Text >Lets's Started!</Text></Button>
                                    </InlineStack>
                                </Box>
                            </BlockStack>
                        </Card>

                    </InlineGrid>
                </BlockStack>
            </Page>
        }
    </>



    )
}


