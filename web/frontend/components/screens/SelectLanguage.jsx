import { BlockStack, Button, Card, InlineStack, Page, Box, Select, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';
import { useAuthenticatedFetch, useNavigate } from '@shopify/app-bridge-react'
export default function SelectLanguage({ setlang }) {
    const navigate  = useNavigate()
    let fetch = useAuthenticatedFetch();
    const [selected, setSelected] = useState('en');
    const [loading, setloading] = useState(false)
    const handleSelectChange = useCallback(
        (value) => setSelected(value),
        [],
    );
    const options = [
        { label: 'English', value: 'en' },
        { label: 'French', value: 'fr' },
        { label: 'German', value: 'de' },
    ];

    const lang = {
        language: "en"
    }
    console.log(Object.values(lang)[0])
    async function updateLanguage() {
        setloading(true);
        const config = {
            "method": "POST",
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify({ language: selected })
        }
        fetch("/api/shop/edit", config)
            .then(res => res.json())
            .then(res => {
                setloading(false);
                if (res.status) {
                    setlang(true);
                    setTimeout(() => {
                        navigate("/")
                    }, 500);
                }
                console.log(res, "---res")
            })
            .catch(err => {
                setloading(false);
                console.log(err);
            })
        console.log(selected);

    }
    return (
        <Page narrowWidth>
            <InlineStack align='center'>
                <Box width='500px'>
                    <BlockStack gap={300}>
                        <InlineStack align='start'>
                            <Text as='h2' variant='headingMd' fontWeight='medium'>Select Your Language for App Context</Text>
                        </InlineStack>
                        <Card >

                            <BlockStack gap={300}>
                                <Select
                                    label="Select language"
                                    options={options}
                                    onChange={handleSelectChange}
                                    value={selected}

                                />
                                <Box>
                                    <Button variant='primary' loading={loading} onClick={updateLanguage}>Select</Button>
                                </Box>
                            </BlockStack>

                        </Card>
                    </BlockStack>
                </Box>
            </InlineStack>

        </Page>
    )
}