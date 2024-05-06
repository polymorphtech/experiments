import {
  Box,
  Card,
  Layout,
  Link,
  List,
  Page,
  Text,
  BlockStack,
} from "@shopify/polaris";
//import 'dotenv/config';
import { MailerSend, EmailParams, Sender, Recipient } from "../utils.server";

export const loader = async ({ request }) => {
  console.log("In Loader ...");

  const mailerSend = new MailerSend({
    apiKey: "mlsn.a5f27c4809405fd5fd177337cf2283b718c120d3886fe912e42467dde5ece4dc",
  });

  const sentFrom = new Sender("team@polymorphtech.xyz", "Your name");

  const recipients = [
    new Recipient("team@polymorphtech.xyz", "Your Client")
  ];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients) 
    .setReplyTo(sentFrom)
    .setSubject("This is a Subject - experiments")
    .setHtml("<strong>This is the HTML content</strong> - experiments")
    .setText("This is the text content - experiments");

    await mailerSend.email.send(emailParams);
  
  return null;
};

export default function AdditionalPage() {

  return (
    <Page>
      <ui-title-bar title="Additional page" />
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="300">
              <Text as="p" variant="bodyMd">
                The app template comes with an additional page which
                demonstrates how to create multiple pages within app navigation
                using{" "}
                <Link
                  url="https://shopify.dev/docs/apps/tools/app-bridge"
                  target="_blank"
                  removeUnderline
                >
                  App Bridge
                </Link>
                .
              </Text>
              <Text as="p" variant="bodyMd">
                To create your own page and have it show up in the app
                navigation, add a page inside <Code>app/routes</Code>, and a
                link to it in the <Code>&lt;ui-nav-menu&gt;</Code> component
                found in <Code>app/routes/app.jsx</Code>.
              </Text>
            </BlockStack>
          </Card>
        </Layout.Section>
        <Layout.Section variant="oneThird">
          <Card>
            <BlockStack gap="200">
              <Text as="h2" variant="headingMd">
                Resources
              </Text>
              <List>
                <List.Item>
                  <Link
                    url="https://shopify.dev/docs/apps/design-guidelines/navigation#app-nav"
                    target="_blank"
                    removeUnderline
                  >
                    App nav best practices
                  </Link>
                </List.Item>
              </List>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}

function Code({ children }) {
  return (
    <Box
      as="span"
      padding="025"
      paddingInlineStart="100"
      paddingInlineEnd="100"
      background="bg-surface-active"
      borderWidth="025"
      borderColor="border"
      borderRadius="100"
    >
      <code>{children}</code>
    </Box>
  );
}
