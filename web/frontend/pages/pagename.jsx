import { Box, Card, Checkbox, EmptyState, InlineGrid, InlineStack, Link, Page, Text } from '@shopify/polaris';
import { useState, useCallback } from 'react';

export default function PageName() {
  const [checked, setChecked] = useState(false);
  const handleChange = useCallback(
    (newChecked) => setChecked(newChecked),
    [],
  );
  
  return (
    <Page>
      <Card>
        {/* <label htmlFor='pikachu'>Track and receive your incoming inventory from suppliers.</label> */}
        <EmptyState
          heading="Manage your inventory transfers"
          action={{ content: 'Add transfer' }}
          secondaryAction={{
            content: 'Learn more',
            url: 'https://help.shopify.com',
          }}
          image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
        >


          <InlineStack align='end'>
            <Checkbox
              id='pikachu'
              checked={checked}
              onChange={handleChange}
             
              label={<Box >
              <InlineStack align='space-evenly' gap={100}><Text id='text'>Track and receive your incoming inventory from suppliers.Track and receive your incoming inventory from suppliers.Track and receive your incoming inventory from suppliers.</Text><Link  url='#'>Jio</Link>

              </InlineStack></Box>
              }
            />
           
          </InlineStack>
        </EmptyState>

      </Card>
    </Page>

  );
}
