# 707077.com

**Chinese Number Codes, Lucky Numbers & Love Codes.** This is a static, responsive website. It runs on GitHub Pages' free plan with no build step and no server.

Live site: https://webworksa1.github.io/707077-com/

## What's inside

- **Tools:**
  - Number Decoder
  - Lucky Number Checker and generator
  - Love Code Maker and love calculator, with shareable cards
  - Number Slang Dictionary (80+ codes)
  - Chinese Zodiac and compatibility
  - Red Envelope guide
- **Content:**
  - Qixi hub with countdown and dates to 2036
  - 6 guides
  - 40 `/meaning/<code>/` SEO pages
  - Videos page
- **Revenue:**
  - AdSense slots, consent-gated
  - multi-step lead form (`/get-report/`) plus inline lead CTAs on every page
  - donations (`/support/`)
  - sponsorship media kit (`/advertise/`)
  - contests with official rules
  - careers page
- **Trust:** privacy, terms, trademark and copyright disclosure, cookie consent, `robots.txt`, `sitemap.xml`, JSON-LD schema.
- **Inquiry banner:** shown at the top of every page and linked to https://web.works/contact.
- **Research and roadmap:**
  - `docs/RESEARCH.md`: cultural research, idea selection, competitor audit, revenue model
  - `docs/BUILD-PROMPTS.md`: phase-wise build prompts

## Configure (edit `assets/js/config.js` only)

| Setting | What it does |
|---|---|
| `adsenseClient` | Your `ca-pub-…` ID. Turns the placeholder slots into live ads. Also add your line to `ads.txt`. |
| `ga4` | Google Analytics 4 ID. |
| `youtubeChannelId` / `youtubeChannelUrl` | Embeds your latest uploads on `/videos/`. |
| `pay.*` | PayPal.me, Stripe Payment Link, Buy Me a Coffee, Ko-fi or Patreon URLs. If a link is empty, its button falls back to the pledge form. |
| `formAlias` | See "Forms" below. |

## Forms (all submissions go to the owner inbox)

Every form posts to FormSubmit's AJAX endpoint. The owner inbox is stored encoded in `config.js`, decoded only at submit time, and never printed on any page.

1. **Activate FormSubmit.** The **first** form submission triggers a one-time activation email from FormSubmit to the owner inbox. Click "Activate".
2. **Optional hardening.** FormSubmit then shows a random alias string. Paste it into `formAlias`, and the encoded address is no longer used at all.

## Custom domain (707077.com)

1. **DNS.** At your registrar, create A records for `@` pointing to:
   - `185.199.108.153`
   - `185.199.109.153`
   - `185.199.110.153`
   - `185.199.111.153`

   Then add a `www` CNAME pointing to `webworksa1.github.io`.
2. **GitHub.** In repo **Settings → Pages → Custom domain**, enter `707077.com` and tick **Enforce HTTPS**.
3. **URLs.** Replace `https://webworksa1.github.io/707077-com/` with `https://707077.com/` in all HTML files, `sitemap.xml` and `robots.txt`. This updates the canonical and sitemap URLs.

## Trademark & copyright

"707077" is used as a domain name and descriptive numeral. No affiliation with any third party is implied. All third-party marks belong to their owners.

© 2026 707077.com. The full disclosure is at `/legal/`.
