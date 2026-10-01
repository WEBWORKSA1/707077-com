# 707077.com: phase-wise build prompts

Run these prompts in order. Each one builds on the output of the one before. Phases 0–7 are implemented in this repository; phases 8–10 are the expansion roadmap.

---

## Phase 0: Strategy and brand

> Act as a digital-media strategist. The domain is 707077.com. In Chinese number codes, 7 = 亲 (kiss), 0 = 你 (you) and 77 = 七夕 (Qixi, Chinese Valentine's Day), so 707077 reads 亲你亲你亲亲, "kiss you, kiss you, kiss-kiss".
>
> Define a site concept, "Chinese Number Codes, Lucky Numbers & Love Codes", covering:
> - target audiences
> - search-demand clusters ("what does 520 mean", "lucky phone number", "Qixi date", "Chinese zodiac calculator")
> - monetization: AdSense, lead generation, sponsors, donations, contests, YouTube
> - brand voice
> - colour palette: Chinese red #c8102e, gold #d4a017, cream, love pink
>
> Flag cultural sensitivities: 七七事变 on 7 July, Ghost Month, the Cantonese 七 homophone, and that 4 is unlucky. Output a one-page brief.

## Phase 1: Information architecture and SEO

> Design the sitemap for a static site on GitHub Pages (relative links, no build server).
>
> **Tools:**
> - `/decoder/`
> - `/lucky-number-checker/`
> - `/love-code/`
> - `/dictionary/`
> - `/chinese-zodiac/`
> - `/red-envelope/`
>
> **Content:**
> - `/qixi/`
> - `/learn/` with 6 guides
> - programmatic `/meaning/<code>/` pages for about 40 high-intent codes
>
> **Money pages:**
> - `/get-report/` (lead generation)
> - `/support/` (donations)
> - `/contests/`
> - `/advertise/`
> - `/careers/`
> - `/videos/`
>
> **Trust pages:**
> - `/about/`
> - `/contact/`
> - `/privacy/`
> - `/terms/`
> - `/legal/` (trademark and copyright)
> - `404`
>
> For every page, give a title pattern, meta description, H1, schema type (FAQPage, BreadcrumbList, Article, Event, WebSite SearchAction) and internal links.

## Phase 2: Design system and layout shell

> Build `assets/css/style.css`. It must be mobile-first, support light and dark mode via CSS variables, and need no framework.
>
> Components:
> - sticky header with burger menu
> - **a top banner on every page: "Contact, if you are interested in this website / domain name / Sponsorship / Advertisement / Partnership", linking to https://web.works/contact**
> - hero
> - cards and a grid system
> - tool panel, digit tiles, score meter, result reveal animation
> - CTA band with form
> - ad slots
> - article typography and FAQ accordions
> - lite YouTube embeds
> - countdown, love card, donation tiers, chips, multi-step form, toast, consent banner, footer
>
> Respect `prefers-reduced-motion`, keep WCAG AA contrast, and never scroll horizontally at 360px wide.

## Phase 3: Number engine and interactive tools

> Write `assets/js/numbers.js`, containing:
>
> 1. **Digit sound map** for 0–9: hanzi, pinyin, homophones and a luck weight.
> 2. **Slang dictionary** of 80+ codes: code, Chinese, pinyin, English and category (love, daily, bye, internet, money, lucky, rude).
> 3. **`analyse(number, mode)`**, which returns a 1–99 score with explained factors:
>    - weights for 8, 6 and 9
>    - penalties for 4
>    - bonuses for combinations such as 168, 518, 888, 1314 and 520
>    - penalties for 14, 514, 748 and 250
>    - weighting of the ending digit
>    - bonuses for repeats and rising runs
> 4. **Longest-match segmentation** that reads a number as a message.
> 5. **Tool initialisers:**
>    - decoder, with shareable `?n=`
>    - lucky checker, plus a generator that keeps a prefix
>    - love calculator (deterministic hash) and phrase-chip code builder, producing a shareable card URL (`?c=&from=&to=`)
>    - dictionary search and filter
>    - zodiac calculator using exact Chinese New Year dates for 1924–2044, plus compatibility (trines, secret friends, clashes)
>    - red-envelope amount guide

## Phase 4: Lead generation (highest priority for revenue)

> Build `/get-report/` as a 3-step form:
> 1. Topic, plus a choice of free report, paid expert help or not sure.
> 2. Number(s) or date(s), date of birth, country, budget and message.
> 3. Name, email, WhatsApp/WeChat, consent and partner opt-in.
>
> Also add a short inline "Free Lucky Number Report" CTA to every tool and content page, and pre-fill topic and number from the tool result via the query string.
>
> **Email delivery:**
> - Send every form to FormSubmit's AJAX endpoint.
> - The destination inbox must never appear in the HTML or as visible text. Store it XOR-encoded in `config.js`, decode it only at submit time, and support swapping in a FormSubmit alias after activation.
> - Visible email links say "Email the team" and build the mailto only on click.
> - Add a honeypot, validation, success states and a GA4 `generate_lead` event.

## Phase 5: Monetization layer

> Implement:
> - **AdSense:** consent-gated loading, with placeholder slots that become `<ins class="adsbygoogle">` once a publisher ID is set in `config.js`. Placements: top, inline, footer. Ship an `ads.txt` template.
> - **Donations page:** red-envelope tiers ($8.88, $18.88, $52 "Love Code", $88.88) that use PayPal, Stripe, Buy Me a Coffee, Ko-fi or Patreon links from config, falling back to a pledge form. Show a transparent fund allocation (operations, talent, marketing, prizes) and a supporters wall.
> - **`/advertise/` media kit:** sponsored tool, seasonal takeover (520, Qixi, CNY), newsletter, contest sponsor, lead partnership, video integration, plus an inquiry form.
> - **`/careers/`:** six roles plus an application form.
> - **`/contests/`:** three contests, an entry form and official rules (no purchase necessary, 18+, judging criteria, licence, privacy).

## Phase 6: Content and programmatic SEO

> Write the following, each with FAQ schema and related links:
> - Six original guides: what 707077 means, lucky and unlucky numbers, the lucky-number economy (with cited data), Chinese love days, the number 7, and how to choose a lucky phone number.
> - A Qixi hub: countdown, dates for 2026–2036, legend, greetings, a gift guide and Event schema.
> - About 40 `/meaning/<code>/` pages: unique note, digit table, embedded live decoder, related codes, and previous/next links.
>
> Add cited statistics only from verifiable sources.

## Phase 7: Compliance, performance and launch

> Add:
> - **Privacy policy:** GDPR, PIPEDA and CCPA rights; Google advertising-cookie disclosure; partner sharing only on opt-in.
> - **Terms:** entertainment disclaimer.
> - **Trademark and copyright disclosure:** 707077 is used descriptively as a domain and numeral, with no affiliation; third-party marks belong to their owners.
> - **Technical files:** cookie consent, `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, an SVG favicon, `.nojekyll` and a `404.html` with absolute links.
>
> Then:
> - Test every page and link with Playwright on desktop and at 390px wide.
> - Assert that the inbox string never appears in the DOM.
> - Deploy to GitHub Pages from the `main` branch root.

## Phase 8: Growth (next 90 days)

> Create:
> - a YouTube Shorts series ("decode a number in 30 seconds")
> - weekly newsletter automation, using FormSubmit or a migration to Buttondown or MailerLite
> - Pinterest share-card images
> - pages for 520 and Qixi refreshed every year
> - outreach to Mandarin schools for cost-per-lead deals
>
> Add a "number of the day" widget and a Chinese New Year 2027 hub (6 February 2027, Year of the Goat).

## Phase 9: Expansion

> Add:
> - a Chinese (简体 / 繁體) language version with hreflang
> - a lunar ↔ Gregorian converter
> - an auspicious-date finder for weddings and openings
> - a name-stroke lucky-number analyser
> - a paid PDF Premium Lucky Report via Stripe Payment Links
> - a premium-number marketplace listing page (lead form only, no payments on-site)
> - community code submissions with moderation

## Phase 10: Custom domain

> Point 707077.com at GitHub Pages:
> 1. Create A records to 185.199.108.153, 185.199.109.153, 185.199.110.153 and 185.199.111.153, plus a `www` CNAME to `webworksa1.github.io`.
> 2. Add a `CNAME` file containing `707077.com`.
> 3. Enable "Enforce HTTPS".
> 4. Replace `https://webworksa1.github.io/707077-com/` with `https://707077.com/` in every canonical, sitemap and robots.txt URL.
> 5. Submit the sitemap in Google Search Console, then apply for AdSense.
