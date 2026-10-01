/* 707077.com — global site behaviour: layout, forms, ads, consent, media. */
(function () {
  var S = window.SITE || {}, d = document, R = d.documentElement.getAttribute("data-root") || "./";
  function $(q, c) { return (c || d).querySelector(q); }
  function $$(q, c) { return Array.prototype.slice.call((c || d).querySelectorAll(q)); }
  function addr() { return (S._k || []).slice().reverse().map(function (c) { return String.fromCharCode(c ^ 77); }).join(""); }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }

  /* toast */
  var toastEl;
  window.toast = function (msg) {
    if (!toastEl) { toastEl = d.createElement("div"); toastEl.className = "toast"; toastEl.setAttribute("role", "status"); d.body.appendChild(toastEl); }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastEl._t); toastEl._t = setTimeout(function () { toastEl.classList.remove("show"); }, 3200);
  };

  /* theme */
  var saved = store("theme"); if (saved) d.documentElement.setAttribute("data-theme", saved);
  $$(".theme").forEach(function (b) {
    b.addEventListener("click", function () {
      var dark = d.documentElement.getAttribute("data-theme") === "dark" ||
        (!d.documentElement.getAttribute("data-theme") && matchMedia("(prefers-color-scheme: dark)").matches);
      var t = dark ? "light" : "dark"; d.documentElement.setAttribute("data-theme", t); store("theme", t);
    });
  });

  /* mobile nav */
  var burger = $(".burger"), nav = $(".nav");
  if (burger && nav) burger.addEventListener("click", function () {
    var o = nav.classList.toggle("open"); burger.setAttribute("aria-expanded", o);
  });

  /* shared lead-capture block: <div data-lead></div> */
  var LEAD_HTML = "<section class=\"sec\"><div class=\"wrap\"><div class=\"cta\"><div><span class=\"eyebrow\" style=\"background:rgba(255,255,255,.15);color:#fff\">Free · 60 seconds</span><h2>Get your personal Lucky Number Report</h2><p>Tell us the number that matters — phone, licence plate, house, business or wedding date. We send a plain-English breakdown with its score, hidden meanings and luckier alternatives.</p><ul class=\"checks\"><li>Phone &amp; plate scores</li><li>Better alternatives</li><li>Love &amp; wedding dates</li><li>No spam, ever</li></ul></div><form data-form=\"Lucky Report Lead (quick)\" data-success=\"Your report request is in. Check your inbox within 48 hours.\"><div class=\"field\"><label for=\"l-name\">First name</label><input id=\"l-name\" name=\"name\" required autocomplete=\"given-name\"></div><div class=\"field\"><label for=\"l-email\">Email</label><input id=\"l-email\" type=\"email\" name=\"email\" required autocomplete=\"email\"></div><div class=\"field\"><label for=\"l-num\">Number to analyse</label><input id=\"l-num\" name=\"number\" inputmode=\"numeric\" placeholder=\"e.g. 13800138888\" required></div><div class=\"field\"><label for=\"l-topic\">It's my…</label><select id=\"l-topic\" name=\"topic\"><option>Phone number</option><option>Licence plate</option><option>House / unit number</option><option>Business / brand number</option><option>Wedding or event date</option><option>Love code</option></select></div><label class=\"hint\"><input type=\"checkbox\" name=\"consent\" value=\"yes\" required style=\"width:auto\"> I agree to receive my report and occasional lucky-number tips. Unsubscribe anytime.</label><button class=\"btn gold block mt\">Send my free report</button></form></div></div></section>";
  $$("[data-lead]").forEach(function (el) { el.outerHTML = LEAD_HTML; });

  /* footer (single source of truth) */
  var f = $("#footer");
  if (f) {
    var y = new Date().getFullYear();
    f.innerHTML =
      '<div class="wrap"><div class="cols">' +
      '<div><a class="logo" href="' + R + '" style="color:#fff"><b>707</b>077</a><p class="mt">Decode any number the Chinese way: lucky-number checks, love codes, slang meanings and festival dates — free, fast and fun.</p>' +
      '<form data-form="Newsletter" class="row" style="margin-top:12px"><input type="email" name="email" required placeholder="Daily lucky number by email" aria-label="Email"><button class="btn sm">Join</button></form></div>' +
      '<div><h4>Tools</h4><ul><li><a href="' + R + 'decoder/">Number Decoder</a></li><li><a href="' + R + 'lucky-number-checker/">Lucky Number Checker</a></li><li><a href="' + R + 'love-code/">Love Code Maker</a></li><li><a href="' + R + 'chinese-zodiac/">Zodiac Calculator</a></li><li><a href="' + R + 'red-envelope/">Red Envelope Guide</a></li></ul></div>' +
      '<div><h4>Explore</h4><ul><li><a href="' + R + 'dictionary/">Number Slang Dictionary</a></li><li><a href="' + R + 'qixi/">Qixi Festival</a></li><li><a href="' + R + 'learn/">Guides</a></li><li><a href="' + R + 'videos/">Videos</a></li><li><a href="' + R + 'meaning/707077/">What 707077 means</a></li></ul></div>' +
      '<div><h4>Get involved</h4><ul><li><a href="' + R + 'get-report/">Free Lucky Report</a></li><li><a href="' + R + 'contests/">Contests &amp; Prizes</a></li><li><a href="' + R + 'support/">Support Us</a></li><li><a href="' + R + 'careers/">Careers</a></li><li><a href="' + R + 'advertise/">Advertise &amp; Sponsor</a></li></ul></div>' +
      '<div><h4>Company</h4><ul><li><a href="' + R + 'about/">About</a></li><li><a href="' + R + 'contact/">Contact</a></li><li><a href="' + R + 'privacy/">Privacy</a></li><li><a href="' + R + 'terms/">Terms</a></li><li><a href="' + R + 'legal/">Trademark &amp; Copyright</a></li></ul></div>' +
      '</div><div class="legal">© ' + y + ' 707077.com. All rights reserved. Number meanings are presented for cultural education and entertainment only — not financial, legal or life advice. "707077" is used as a domain name and descriptive numeral; no affiliation with any company, product or trademark is implied. Third-party names belong to their owners. ' +
      '<a href="' + R + 'legal/">Full disclosure</a> · <a href="' + S.inquiryUrl + '" target="_blank" rel="noopener">Buy / sponsor / partner with this website</a></div></div>';
  }

  /* hidden email links: <a data-mail="Subject">text</a> */
  d.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("[data-mail]");
    if (!a) return; e.preventDefault();
    location.href = "mai" + "lto:" + addr() + "?subject=" + encodeURIComponent(a.getAttribute("data-mail") || "Inquiry from 707077.com");
  });

  /* forms -> FormSubmit AJAX (owner inbox never printed in markup) */
  function endpoint() { return "https://formsubmit.co/ajax/" + (S.formAlias || addr()); }
  d.addEventListener("submit", function (e) {
    var form = e.target; if (!form.matches || !form.matches("form[data-form]")) return;
    e.preventDefault();
    if (form._honey && form._honey.value) return;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    var data = {}; new FormData(form).forEach(function (v, k) { if (k !== "_honey") data[k] = data[k] ? data[k] + ", " + v : v; });
    data._subject = "[707077.com] " + form.getAttribute("data-form") + (data.name ? " — " + data.name : "");
    data._template = "table"; data._captcha = "false"; data.page = location.href;
    var btn = form.querySelector("button[type=submit],button:not([type])"), label = btn ? btn.textContent : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    fetch(endpoint(), { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function () { done(form); })
      .catch(function () { toast("Network issue — please try again in a moment."); })
      .finally(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
  });
  function done(form) {
    var msg = form.getAttribute("data-success") || "Thank you! We received your message and will reply soon.";
    var ok = d.createElement("div"); ok.className = "note"; ok.setAttribute("role", "status"); ok.innerHTML = "<strong>✓ Sent.</strong> " + msg;
    form.replaceWith(ok); toast("Sent — thank you!");
    if (window.gtag) gtag("event", "generate_lead", { form: form.getAttribute("data-form") });
  }
  /* add honeypot to every form */
  $$("form[data-form]").forEach(function (fm) {
    var h = d.createElement("input"); h.type = "text"; h.name = "_honey"; h.className = "hp"; h.tabIndex = -1; h.setAttribute("autocomplete", "off"); h.setAttribute("aria-hidden", "true"); fm.appendChild(h);
  });

  /* consent + ads + analytics */
  function loadAds() {
    if (!S.adsenseClient) return;
    var s = d.createElement("script"); s.async = true; s.crossOrigin = "anonymous";
    s.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=" + S.adsenseClient; d.head.appendChild(s);
    $$(".ad-slot").forEach(function (el) {
      var slot = (S.adSlots || {})[el.getAttribute("data-slot")] || "";
      el.classList.add("filled");
      el.innerHTML = '<ins class="adsbygoogle" style="display:block" data-ad-client="' + S.adsenseClient + '"' + (slot ? ' data-ad-slot="' + slot + '"' : "") + ' data-ad-format="auto" data-full-width-responsive="true"></ins>';
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    });
  }
  function loadGA() {
    if (!S.ga4) return;
    var s = d.createElement("script"); s.async = true; s.src = "https://www.googletagmanager.com/gtag/js?id=" + S.ga4; d.head.appendChild(s);
    window.dataLayer = window.dataLayer || []; window.gtag = function () { dataLayer.push(arguments); };
    gtag("js", new Date()); gtag("config", S.ga4);
  }
  $$(".ad-slot").forEach(function (el) {
    if (!el.innerHTML.trim()) el.innerHTML = 'Advertisement space · <a href="' + R + 'advertise/">Reach this audience</a>';
  });
  var consent = store("consent");
  if (consent === "yes") { loadAds(); loadGA(); }
  else if (consent !== "no") {
    var c = d.createElement("div"); c.className = "consent show"; c.setAttribute("role", "dialog");
    c.innerHTML = 'We use cookies for ads and anonymous analytics that keep this site free. <a href="' + R + 'privacy/">Privacy</a><div class="row" style="margin-top:10px"><button class="btn sm" data-c="yes">Accept</button><button class="btn sm ghost" data-c="no">Decline</button></div>';
    d.body.appendChild(c);
    c.addEventListener("click", function (e) {
      var v = e.target.getAttribute("data-c"); if (!v) return;
      store("consent", v); c.remove(); if (v === "yes") { loadAds(); loadGA(); }
    });
  }

  /* lite YouTube embeds: <div class="vid" data-id="ID" data-title="..."></div> */
  $$(".vid[data-id]").forEach(function (v) {
    var id = v.getAttribute("data-id");
    v.innerHTML = '<img loading="lazy" alt="' + (v.getAttribute("data-title") || "Video") + '" src="https://i.ytimg.com/vi/' + id + '/hqdefault.jpg">';
    v.setAttribute("role", "button"); v.setAttribute("tabindex", "0");
    function play() { v.classList.add("on"); v.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0" title="' + (v.getAttribute("data-title") || "Video") + '" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>'; }
    v.addEventListener("click", play); v.addEventListener("keydown", function (e) { if (e.key === "Enter") play(); });
  });
  var ch = $("#channel-embed");
  if (ch && S.youtubeChannelId) {
    ch.innerHTML = '<div class="vid on"><iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=UU' + S.youtubeChannelId.slice(2) + '" title="Latest videos" allowfullscreen></iframe></div>';
  }
  $$("[data-yt-channel]").forEach(function (a) { if (S.youtubeChannelUrl) a.href = S.youtubeChannelUrl; });

  /* countdown: <div class="cd" data-countdown="2027-08-08T00:00:00+08:00"></div> */
  $$("[data-countdown]").forEach(function (el) {
    var t = new Date(el.getAttribute("data-countdown")).getTime();
    function tick() {
      var s = Math.max(0, Math.floor((t - Date.now()) / 1000));
      el.innerHTML = [["Days", s / 86400], ["Hours", s / 3600 % 24], ["Min", s / 60 % 60], ["Sec", s % 60]].map(function (p) {
        return "<div><b>" + Math.floor(p[1]) + "</b><span>" + p[0] + "</span></div>";
      }).join("");
    }
    tick(); setInterval(tick, 1000);
  });

  /* share helper */
  window.shareIt = function (text, url) {
    url = url || location.href;
    if (navigator.share) { navigator.share({ title: d.title, text: text, url: url }).catch(function () {}); return; }
    var full = text + " " + url;
    (navigator.clipboard ? navigator.clipboard.writeText(full) : Promise.reject()).then(function () { toast("Link copied — paste it anywhere!"); })
      .catch(function () { prompt("Copy this link:", full); });
  };
  $$("[data-share]").forEach(function (b) { b.addEventListener("click", function () { shareIt(b.getAttribute("data-share")); }); });

  /* donation buttons: <a data-pay="paypal">; fall back to pledge form */
  $$("[data-pay]").forEach(function (a) {
    var link = (S.pay || {})[a.getAttribute("data-pay")];
    if (link) { a.href = link; a.target = "_blank"; a.rel = "noopener"; }
    else { a.href = "#pledge"; }
  });
  $$("[data-amount]").forEach(function (b) {
    b.addEventListener("click", function () {
      var i = $("#pledge [name=amount]"); if (i) { i.value = b.getAttribute("data-amount"); }
    });
  });

  /* chips -> hidden input */
  $$(".chips[data-name]").forEach(function (g) {
    var multi = g.hasAttribute("data-multi"), input = d.createElement("input");
    input.type = "hidden"; input.name = g.getAttribute("data-name"); g.after(input);
    g.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return; e.preventDefault();
      if (!multi) $$(".chip", g).forEach(function (x) { x.classList.remove("on"); });
      c.classList.toggle("on");
      input.value = $$(".chip.on", g).map(function (x) { return x.textContent.trim(); }).join(", ");
    });
  });

  /* multi-step forms */
  $$("form[data-steps]").forEach(function (fm) {
    var steps = $$(".step", fm), bars = $$(".steps i", fm), i = 0;
    function show(n) { steps.forEach(function (s, k) { s.classList.toggle("on", k === n); }); bars.forEach(function (b, k) { b.classList.toggle("on", k <= n); }); i = n; }
    fm.addEventListener("click", function (e) {
      if (e.target.matches("[data-next]")) {
        e.preventDefault();
        var bad = $$("input,select,textarea", steps[i]).filter(function (x) { return !x.checkValidity(); });
        if (bad.length) { bad[0].reportValidity(); return; }
        show(Math.min(i + 1, steps.length - 1));
      }
      if (e.target.matches("[data-prev]")) { e.preventDefault(); show(Math.max(i - 1, 0)); }
    });
    show(0);
  });

  /* prefill forms from query string (e.g. ?topic=phone&number=8888) */
  var qs = new URLSearchParams(location.search);
  qs.forEach(function (v, k) { $$('form [name="' + k + '"]').forEach(function (x) { if (x.type !== "hidden" || x.name !== "_honey") x.value = v; }); });
})();
