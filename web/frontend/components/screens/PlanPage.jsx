import React from 'react'
import { BlockStack, Card, InlineGrid, InlineStack, Page, Text, Box, Button, Divider } from '@shopify/polaris'
import Layout from '../layout/Layout'
const PlanPage = () => {
    const plan = [
        { name: "BASIC", price: "$0/ month" },
        { name: "PRO", price: "$39/ month" },
        { name: "PLUS", price: "$99/ month" }
    ]
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
                                        <Box background='bg-surface' borderRadius='400' borderWidth='0165' borderColor='border-tertiary'>
                                            <BlockStack>
                                                <Box padding={'300'} background='bg-surface-active' borderStartEndRadius='400' borderStartStartRadius='400' >
                                                    <BlockStack gap={100}>
                                                        <Text fontWeight='medium'>{ele.name}</Text>
                                                        <Text as='h4' variant='headingLg'>{ele.price}</Text>
                                                    </BlockStack>
                                                </Box>
                                                <Divider borderWidth='025'></Divider>
                                                <Box>

                                                </Box>
                                                <Box padding={'300'}>
                                                    <InlineStack align='start'>
                                                        <Box borderWidth='0165' background='bg-inverse'>
                                                            <Button variant='' ><Text as='p' variant='bodyMd' tone='text-inverse'>SELECT PLAN</Text></Button>
                                                        </Box>
                                                    </InlineStack>


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
