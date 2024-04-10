import React from 'react'
import {BlockStack, Card, InlineGrid, InlineStack, Page, Text} from '@shopify/polaris'
const PlanPage = () => {
  return (
    <Page fullWidth>
        <BlockStack gap={300}>
            <Card>
                <InlineStack>
                    <Text>Plan List</Text>
                </InlineStack>
            </Card>
            <InlineGrid columns={3} gap={300}>
                <Card><Text>Plan 1</Text></Card>
                <Card><Text>Plan 1</Text></Card>
                <Card><Text>Plan 1</Text></Card>
            </InlineGrid>
        </BlockStack>
    </Page>
  )
}

export default PlanPage
