/* 707077.com — site configuration. Edit values here; no other file needs changing. */
window.SITE = {
  name: "707077",
  inquiryUrl: "https://web.works/contact",

  /* Google AdSense: set your publisher ID, e.g. "ca-pub-1234567890123456". Empty = house ads shown. */
  adsenseClient: "",
  /* Optional per-placement slot IDs from AdSense (auto ads work without them). */
  adSlots: { top: "", inline: "", sidebar: "", footer: "" },

  /* Google Analytics 4 measurement ID, e.g. "G-XXXXXXX". Empty = no analytics. */
  ga4: "",

  /* Your YouTube channel ID (starts with UC...). When set, the Videos page embeds your latest uploads. */
  youtubeChannelId: "",
  youtubeChannelUrl: "",

  /* Donation / payment links. Empty values fall back to the pledge form (we reply with a secure link). */
  pay: { paypal: "", stripe: "", buymeacoffee: "", kofi: "", patreon: "" },

  /* Form delivery. After the first form submission, FormSubmit emails an activation link to the owner inbox.
     After activating, paste the random alias FormSubmit gives you below (e.g. "a1b2c3d4e5...") so even the
     encoded address is no longer used. */
  formAlias: "",
  _k: [32, 34, 46, 99, 33, 36, 44, 32, 42, 13, 124, 44, 62, 38, 63, 34, 58, 47, 40, 58]
};
