import { BlockStack, Button, Box, Card, Checkbox, InlineStack, Page, Text } from '@shopify/polaris'
import { useTranslation, Trans } from "react-i18next";
import Layout from '../components/layout/Layout';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Box width='100%' minHeight='100vh'>
      <Layout />
    </Box>
  )

}
