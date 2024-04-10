import React, { useEffect, useState } from 'react'
import { Card, Page } from '@shopify/polaris'
import WelcomPage from '../screens/WelcomPage'
import { useAuthenticatedFetch, Loading } from '@shopify/app-bridge-react'
import SelectLanguage from '../screens/SelectLanguage';

export default function Layout() {
    const [loading, setloading] = useState(true);

    return (

        <Page>
            <SelectLanguage />
            <WelcomPage />
        </Page>
    )
}


