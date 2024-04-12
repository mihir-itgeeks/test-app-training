import { BlockStack, Button, Card, Checkbox, InlineStack, Page, Text } from '@shopify/polaris'
import { useTranslation, Trans } from "react-i18next";
import { useAuthenticatedFetch } from '@shopify/app-bridge-react';
import { useEffect, useState } from 'react';
import AddCustomer from './AddCustomer';
import CustomerTable from './CustomerTable';
export default function CustomerPage() {
  const { t } = useTranslation();
  const [createScreen, setCreateScreen] = useState(false)
  let fetch = useAuthenticatedFetch();

  async function fetchProductList() {
    const config = {
      "method": "POST",
      "headers": { "Content-Type": "application/json" },
      "body": JSON.stringify({
        "limit": 30
      })
    }

    fetch("/api/productlist", config)
      .then(res => res.json())
      .then(res => {
        console.log(res, "res---");
      })
      .catch(error => {
        console.log(error, "error")
      })
  }

  const [customerList, setCustomerList] = useState([])
  const [customer, setCustomer] = useState([]);
  const [needUpdate, setUpdate] = useState()
  useEffect(() => {
    if (needUpdate) {
      fetchProductList()
      setCreateScreen(true)
    }
  }, [needUpdate])

  return (
    <Page fullWidth>

      <BlockStack gap={300}>
        <Card>
          <InlineStack align='space-between' >
            <Text as='h2' variant='headingMd'>Customer List</Text>
            <Button onClick={() => { setCreateScreen(true) }}>Add Customer</Button>
          </InlineStack>
        </Card>
        {createScreen ?
          <AddCustomer hide={setCreateScreen} needUpdate={needUpdate} setUpdate={setUpdate} /> :
          <CustomerTable setCustomerList={setCustomerList} customerList={customerList} setCustomer={setCustomer} customer={customer} setUpdate={setUpdate} />
        }

       

      </BlockStack>

    </Page>
  );
}
