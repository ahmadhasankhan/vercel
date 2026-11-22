import Script from "next/script";
import { CONSENT_KEY, GTM_ID } from "@/lib/site";

/** EEA + UK + Switzerland: GDPR-style consent required before analytics/ads cookies. */
const CONSENT_REGIONS = [
  "AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "GR", "HU", "IE", "IT",
  "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE", "IS", "LI", "NO",
  "GB", "CH",
];

/**
 * Google Tag Manager with Google Consent Mode v2, loaded on the very first page view.
 *
 * 1. Consent defaults are set BEFORE GTM loads:
 *    - EEA/UK/CH visitors: everything "denied" → no analytics/ads cookies; GA4 sends
 *      anonymous cookieless pings so Google can model visits (Advanced Consent Mode).
 *    - Everyone else: "granted" (they can still opt out via the banner).
 * 2. A returning visitor's stored choice is applied immediately.
 * 3. GTM loads. The cookie banner later sends gtag('consent','update', …).
 */
export default function GoogleTagManager() {
  if (!GTM_ID) return null;

  const code = `
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
var G='granted',D='denied';
gtag('consent','default',{analytics_storage:G,ad_storage:G,ad_user_data:G,ad_personalization:G});
gtag('consent','default',{analytics_storage:D,ad_storage:D,ad_user_data:D,ad_personalization:D,wait_for_update:500,region:${JSON.stringify(CONSENT_REGIONS)}});
try{var c=JSON.parse(localStorage.getItem('${CONSENT_KEY}')||'null');
if(c&&c.v===1&&Date.now()-c.ts<365*864e5){gtag('consent','update',{analytics_storage:c.analytics?G:D,ad_storage:c.marketing?G:D,ad_user_data:c.marketing?G:D,ad_personalization:c.marketing?G:D});}}catch(e){}
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});
(function(d,s,i){var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;
j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(document,'script','${GTM_ID}');`;

  return (
    <Script id="gtm-consent-mode" strategy="beforeInteractive">
      {code}
    </Script>
  );
}
