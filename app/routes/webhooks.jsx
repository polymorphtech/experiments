import { authenticate } from "../shopify.server";
import db from "../db.server";
import { MailerSend, EmailParams, Sender, Recipient } from "../utils.server";

export const action = async ({ request }) => {
  const { topic, shop, session, admin, payload } = await authenticate.webhook(
    request
  );

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  switch (topic) {
    case "APP_UNINSTALLED":
      if (session) {
        await db.session.deleteMany({ where: { shop } });
      }

      console.log("App Uninstallation ...");

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
        .setSubject("Uninstall - experiments")
        .setHtml("<strong>Uninstall</strong> - experiments")
        .setText("Uninstall - experiments");
    
        await mailerSend.email.send(emailParams);

      break;
    case "CUSTOMERS_DATA_REQUEST":
    case "CUSTOMERS_REDACT":
    case "SHOP_REDACT":
    default:
      throw new Response("Unhandled webhook topic", { status: 404 });
  }

  throw new Response();
};
