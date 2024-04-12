import React, { useEffect, useState } from 'react'
import { BlockStack, Card, InlineGrid, InlineStack, Page, Text, Box, Button, Divider, List, Link } from '@shopify/polaris'
import { plan } from './jsons/plan.json'
import {useNavigate} from 'react-router-dom'
import { useAuthenticatedFetch } from '@shopify/app-bridge-react'
const PlanPage = ({ setActivePlan, activeplan }) => {

    const ID = new URL(window.location).searchParams.get("charge_id")
    const currentPlan = new URL(window.location).searchParams.get("currentPlan")
    const navigate = useNavigate();
    let fetch = useAuthenticatedFetch();
    const [selected, setplan] = useState("");
    const [abort,setabort] = useState(new AbortController());
    

    useEffect(() => {
        if (currentPlan && ID) {
        ActiveSubscription()
        }
    }, [ID, currentPlan]);

    async function ActiveSubscription() {

        fetch("/api/payment/active_subscriptions")
            .then(res => res.json())
            .then(res => {

                console.log(res, "------active_subscriptions")
                if (res.status) {

                    if (ID === res.result.currentAppInstallation.activeSubscriptions[0].id.split('/')[4] &&
                        currentPlan === res.result.currentAppInstallation.activeSubscriptions[0].name) {
                        UpdatePlan()
                    }else{
                        navigate("/plan")
                    }
                    setActivePlan(res.result.currentAppInstallation.activeSubscriptions[0].name)
                }
            })
            .catch(err => { console.log(err) })
    }

    async function UpdatePlan() {
        const config = {
            "method": "PUT",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                charge_id: ID,
                currentPlan: currentPlan
            })
        }
        fetch("/api/payment/update_subscribe", config)
            .then(res => res.json())
            .then(res => {
                console.log(res, "---update res"); setActivePlan(res.result.activePlan); setTimeout(() => {
                    navigate("/plan")
                }, 500);
            })
            .catch(err => { console.log(err) })
    }

    async function SelectPlan(name, amount) {
        abort.abort()
        const abcontroller = new AbortController();
        setabort(abcontroller)
        
        console.log(name, "----nmae")
        const config = {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({
                currentPlan: name,
                redirectUrl: "https://admin.shopify.com/store/developmentcheck/apps/test-app-training-1/plan",

            }),
            signal:abcontroller.signal
            
        }
        fetch("/api/payment/subscribe", config)
            .then(res => res.json())
            .then(res => {
                if (res.status) {
                    window.open(res.result.appSubscriptionCreate.confirmationUrl,"_parent");
                }
                console.log(res)

            })
            .catch(err => console.log(err, "---error"))
    }

    return (
        <Box padding={"50px"}>
            <Page>
                <BlockStack gap={400}>
                    <BlockStack align='start' inlineAlign='start' gap={300}>
                        <Text as='h1' variant='headingLg'>Plans and Pricing</Text>
                        <Text as='h2' variant='headingMd' fontWeight='medium'>We offer monthly and yearly plans for Easy Subscription. ( Save 10% on Yearly Plans )</Text>
                    </BlockStack>
                    <InlineStack align='center'>
                        <Box width='100%'>
                            <InlineGrid columns={3} gap={300}>
                                {plan.map((ele, index) => {
                                    return (
                                        <Box background='bg-surface' borderRadius='400' borderWidth='0165' borderColor='border-tertiary' shadow='600'>
                                            <BlockStack gap={"200px"}>
                                                <Box width='100%' padding={'300'} background={ele.name === activeplan ? 'bg-fill-success-secondary' : 'bg-surface-active'} borderStartEndRadius='400' borderStartStartRadius='400' >
                                                    <BlockStack gap={100}>
                                                        <Text fontWeight='medium'>{ele.name}</Text>
                                                        <Text as='h4' variant='headingLg'>{ele.price}</Text>
                                                    </BlockStack>
                                                </Box>
                                                <Divider borderWidth='025'></Divider>
                                                <Box padding={'300'} width='100%' minHeight='420px'>
                                                    <List>
                                                        {ele.planList.map((li, index) => {
                                                            return (
                                                                <List.Item><Text as='p' variant='bodyLg'>{li}</Text></List.Item>
                                                            )
                                                        })}
                                                    </List>
                                                </Box>
                                                <Divider borderWidth='025'></Divider>

                                                <Box padding={'300'} width='100%' >
                                                    <BlockStack align='end' >

                                                        <InlineStack align='start'>
                                                            <Box minHeight='30px'>
                                                                <Button
                                                                    variant='primary'
                                                                    disabled={ele.name === activeplan}
                                                                    loading={ele.name === selected}
                                                                    onClick={() => {
                                                                        setplan(ele.name);
                                                                        SelectPlan(ele.name);
                                                                    }}

                                                                >
                                                                    <Text as='p' variant='bodyMd' >{ele.name === activeplan ? 'Activated' : 'SELECT PLAN'}</Text></Button>
                                                            </Box>
                                                        </InlineStack>



                                                    </BlockStack>
                                                </Box>

                                            </BlockStack>
                                        </Box>
                                    )
                                })}


                            </InlineGrid>
                        </Box>
                    </InlineStack>


                </BlockStack>


            </Page>
        </Box>
    )
}

export default PlanPage
