import React from 'react'
import { Card, Page, Text } from '@shopify/polaris'
import CustomerPage from '../customer/CustomerPage'
export default function CustomerView() {
    return (
        <Page narrowWidth title='Customers'>
           <CustomerPage/>

        </Page>
    )
}


