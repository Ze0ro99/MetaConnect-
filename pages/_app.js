// pages/_app.js

import { SpeedInsights } from "@vercel/speed-insights/next";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* تأكد من أن لديك مفتاح API في متغير البيئة */}
      <SpeedInsights apiKey={process.env.NEXT_PUBLIC_SPEED_INSIGHTS_API_KEY} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
