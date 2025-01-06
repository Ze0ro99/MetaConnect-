import { SpeedInsights } from "@vercel/speed-insights/next";
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SpeedInsights
        // يمكنك إضافة الخيارات المطلوبة هنا
        apiKey="5d8bc63cfa473df9a90c3308432e255c892f4b363143dfd8fa98c6c44d1b0bda13b78ce5a9c195b1648220c33a7b4f026b8176c0a0c87ba421c309533a57480c" // تأكد من استبدال YOUR_API_KEY بمفتاح API الخاص بك
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
