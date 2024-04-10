import React, { useEffect, useState } from 'react'
import { Card, Page, Loading, Frame, Text } from '@shopify/polaris'
import WelcomPage from '../screens/WelcomPage'
import { useAuthenticatedFetch, } from '@shopify/app-bridge-react'
import SelectLanguage from '../screens/SelectLanguage';

export default function Layout({ props }) {

    return (

        <Page>
            {props.loading ? <Frame>
                <Loading />
            </Frame>
                :
                !props.tutorial ?
                    <WelcomPage setTutorial={props.setTutorial} />
                    :
                    <Page narrowWidth>
                        <Card>
                            <Text as='h1' alignment='center' variant='heading2xl'>Dashboard</Text>

                        </Card>

                    </Page>

            }
        </Page>
    )
}


