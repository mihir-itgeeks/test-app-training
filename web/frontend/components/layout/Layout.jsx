import React, { useEffect, useState } from 'react'
import { Card, Page, Loading, Frame, Text,Image,MediaCard } from '@shopify/polaris'
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
                    <Page fullWidth title='Dashboard'>
                        <MediaCard
                            title="Getting Started"
                            primaryAction={{
                                content: 'Easy Subsciptions',
                                onAction: () => { },
                            }}
                            description="Discover how Shopify can power up your entrepreneurial journey."
                            // popoverActions={[{ content: 'Dismiss', onAction: () => { } }]}
                        >
                            <Image
                            width={'100%'}
                                
                                source="https://burst.shopifycdn.com/photos/business-woman-smiling-in-office.jpg?width=1850"
                            />
                        </MediaCard>

                    </Page>

            }
        </Page>
    )
}


