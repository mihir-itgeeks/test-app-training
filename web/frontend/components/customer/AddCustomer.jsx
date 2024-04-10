import React, { useEffect, useState } from 'react'
import { Button, Card, Form, FormLayout, InlineStack, Page, Text, TextField } from "@shopify/polaris"
import { FolderAddIcon, XIcon } from '@shopify/polaris-icons'
import { useAuthenticatedFetch, useToast } from '@shopify/app-bridge-react'
const AddCustomer = ({ hide, needUpdate, setUpdate }) => {
    const { show } = useToast();
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        address: "",
        age: ""
    });
    const def = {
        name: "",
        phone: "",
        email: "",
        address: "",
        age: ""
    }

    console.log(formData, "----ne")
    const handleTextInput = (name, value) => {
        const spread = { ...formData, [name]: value };
        setFormData(spread);
    }
    useEffect(() => {
        if (needUpdate) {
            setFormData(needUpdate)
        }
    }, [needUpdate])
    let fetch = useAuthenticatedFetch()

    async function addCustomer() {
        const config = {
            "method": `${needUpdate? "PUT":"POST"}`,
            "headers": { "Content-Type": "application/json" },
            "body": JSON.stringify(formData)
        }
        fetch(`${needUpdate ?"/api/customer/update" : "/api/customer/add"}`, config)
            .then(res => res.json())
            .then(res => {
                // show(res.message)
                console.log(res, "----res")
                if (res.status) {
                    show(res.message)
                    setTimeout(() => {
                        hide(false);
                        setUpdate(undefined)
                    }, 800);
                } else {
                    show(res.message)
                }
            })
            .catch(err => {
                console.log(err)
            })

    }

    
    return (
        <Page narrowWidth>
            <Card>
                <InlineStack align='space-between'>
                    <Text as='h3' variant='headingMd'>{needUpdate ? 'Update Customer' : 'Add Customer'}</Text>
                    <Button icon={XIcon} accessibilityLabel='center' variant='plain' onClick={() => { hide(false); setUpdate(undefined) }}></Button>
                </InlineStack>
                <FormLayout>
                    <TextField
                        label="Customer Name"
                        name="name"
                        value={formData.name}

                        placeholder="Enter Customer Name"
                        onChange={(newText) => handleTextInput("name", newText)}
                        autoComplete="off"

                    />

                    <TextField
                        type="text"
                        label="Phone Number"
                        name="phone"
                        placeholder="Enter Phone Number"
                        value={formData.phone}
                        onChange={(newText) => handleTextInput("phone", newText)}


                    />
                    <TextField
                        type="email"
                        label="Customer Email"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={(newText) => handleTextInput("email", newText)}
                        autoComplete="email"

                    />

                    <TextField
                        type="text"
                        label="Address"
                        value={formData.address}
                        placeholder="Enter Address"
                        onChange={(newText) => handleTextInput("address", newText)}
                        autoComplete="email"
                    />
                    <TextField
                        type="number"
                        label="Age"
                        value={formData.age}
                        // placeholder="Enter "
                        onChange={(newText) => handleTextInput("age", newText)}

                    />
                    <Button variant='primary' fullWidth onClick={addCustomer}>{needUpdate ? 'Update' : 'Add'} Customer</Button>
                </FormLayout>
            </Card>
        </Page>

    )
}

export default AddCustomer
