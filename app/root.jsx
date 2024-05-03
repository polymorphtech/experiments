import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

function sessionRewind(o) {
  var w = window;
  w.SessionRewindConfig = o;
  var f = document.createElement("script");
  f.async = 1;
  f.crossOrigin = "anonymous"; 
  f.src = "https://rec.sessionrewind.com/srloader.js";
  var g = document.getElementsByTagName("head")[0];
  g.insertBefore(f, g.firstChild);
}

export default function App() {

  useEffect(() => {
    Crisp.configure("f6503c1d-55f0-4bf6-85c6-3a3cdc75e0b3");

    if (!window.SessionRewindConfig){
      sessionRewind({
        apiKey: 'jKkAvPSUiq1hds1ie8Oxh9iFJZEoUDFp3WnHA7Rl',
        // Start recording immediately upon page load.
        // If not set (or set to false) recording will need to be started later via window.sessionRewind.startSession()
        startRecording: true,
        // OPTIONAL: Create a new session upon page load, even if one has already started.
        // createNewSession: false,
        // OPTIONAL: Custom session metadata
        // sessionInfo: {
        //   customFieldA: This is a custom field // Example custom field
        // },
        // OPTIONAL: Custom user metadata
        // userInfo: {
        //   userId: hello@sessionrewind.com, // This field is required when using userInfo
        //  userName: John Doe, // Optional, user name
        // },
        // OPTIONAL: onLoad Callback
        // onLoad: () => {
        //   // Callback executed when the script is loaded. It can be used to
        //   // do things like:
        //   window.sessionRewind.getSessionUrl((url) => { foo... }
        // },
      });
  }
  }, []);

  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <LiveReload />
        <Scripts />
      </body>
    </html>
  );
}
