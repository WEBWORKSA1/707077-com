/* 707077.com — number engine: digit sounds, slang dictionary, luck scoring and interactive tools. */
(function () {
  var d = document, R = d.documentElement.getAttribute("data-root") || "./";
  function $(q, c) { return (c || d).querySelector(q); }
  function esc(s) { return String(s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }

  /* Mandarin digit sounds and the words they evoke */
  var DIG = {
    "0": { h: "零", p: "líng", s: "你 nǐ (you) · 灵 líng (spirit)", m: "“you” in text codes; wholeness", l: 0 },
    "1": { h: "一", p: "yī", s: "要 yào (want) · 一生 (a lifetime)", m: "want, unity, a lifetime", l: 0 },
    "2": { h: "二", p: "èr", s: "爱 ài (love) · 易 (easy, Cantonese)", m: "love; good things come in pairs", l: 1 },
    "3": { h: "三", p: "sān", s: "生 shēng (life) · 想 xiǎng (miss)", m: "life, growth, missing someone", l: 1 },
    "4": { h: "四", p: "sì", s: "死 sǐ (death) · 是 shì (is)", m: "the classic unlucky digit", l: -8 },
    "5": { h: "五", p: "wǔ", s: "我 wǒ (I, me) · 无 wú (without)", m: "“me” in text codes; five elements", l: -1 },
    "6": { h: "六", p: "liù", s: "溜 liū (smooth) · 流 liú (flow)", m: "smooth progress; 666 = awesome", l: 4 },
    "7": { h: "七", p: "qī", s: "亲 qīn (kiss, dear) · 起 qǐ (rise) · 气 qì (energy)", m: "kiss, rise, togetherness — but also the ghost month", l: 0 },
    "8": { h: "八", p: "bā", s: "发 fā (prosper) · 抱 bào (hug)", m: "wealth and prosperity — the luckiest digit", l: 7 },
    "9": { h: "九", p: "jiǔ", s: "久 jiǔ (long-lasting) · 就 jiù (just)", m: "longevity, eternity, devotion", l: 4 }
  };

  /* code, Chinese, pinyin, English, category */
  var DICT = [
    ["707077", "亲你亲你亲亲", "qīn nǐ qīn nǐ qīn qīn", "Kiss you, kiss you, kiss-kiss (a playful reading using 7 = 亲 and 0 = 你)", "love"],
    ["520", "我爱你", "wǒ ài nǐ", "I love you", "love"], ["521", "我愿意", "wǒ yuànyì", "I'm willing / I do", "love"],
    ["5201314", "我爱你一生一世", "wǒ ài nǐ yīshēng yīshì", "I love you for a lifetime", "love"],
    ["1314", "一生一世", "yīshēng yīshì", "For a whole lifetime / forever", "love"],
    ["1314920", "一生一世就爱你", "yīshēng yīshì jiù ài nǐ", "Love only you all my life", "love"],
    ["530", "我想你", "wǒ xiǎng nǐ", "I miss you", "love"], ["360", "想念你", "xiǎngniàn nǐ", "Missing you", "love"],
    ["770", "亲亲你", "qīnqīn nǐ", "Kiss you", "love"], ["775", "亲亲我", "qīnqīn wǒ", "Kiss me", "love"],
    ["77", "亲亲", "qīnqīn", "Kiss-kiss; also 七七 → Qixi, the 7th day of the 7th month", "love"],
    ["70", "亲你", "qīn nǐ", "Kiss you (7 = 亲, 0 = 你)", "love"], ["7070", "亲你亲你", "qīn nǐ qīn nǐ", "Kiss you, kiss you", "love"],
    ["770880", "亲亲你抱抱你", "qīnqīn nǐ bàobào nǐ", "Kiss you, hug you", "love"],
    ["885", "抱抱我", "bàobào wǒ", "Hug me", "love"], ["721", "亲爱的", "qīn'ài de", "Darling / dear", "love"],
    ["258", "爱我吧", "ài wǒ ba", "Love me", "love"], ["25184", "爱我一辈子", "ài wǒ yībèizi", "Love me for life", "love"],
    ["910", "就要你", "jiù yào nǐ", "I only want you", "love"], ["940", "就是你", "jiù shì nǐ", "It's you", "love"],
    ["9420", "就是爱你", "jiù shì ài nǐ", "It's you I love", "love"], ["04551", "你是我唯一", "nǐ shì wǒ wéiyī", "You're my one and only", "love"],
    ["0594184", "你我就是一辈子", "nǐ wǒ jiù shì yībèizi", "You and me, for life", "love"], ["3344", "生生世世", "shēngshēng shìshì", "Life after life, forever", "love"],
    ["3399", "长长久久", "chángcháng jiǔjiǔ", "Long-lasting, forever", "love"], ["234", "爱相随", "ài xiāng suí", "Love follows", "love"],
    ["1573", "一往情深", "yī wǎng qíng shēn", "Deeply devoted", "love"], ["20863", "爱你到来生", "ài nǐ dào láishēng", "Love you into the next life", "love"],
    ["584520", "我发誓我爱你", "wǒ fāshì wǒ ài nǐ", "I swear I love you", "love"], ["53770", "我想亲亲你", "wǒ xiǎng qīnqīn nǐ", "I want to kiss you", "love"],
    ["53880", "我想抱抱你", "wǒ xiǎng bàobào nǐ", "I want to hug you", "love"], ["57520", "吾妻我爱你", "wú qī wǒ ài nǐ", "My wife, I love you", "love"],
    ["5240", "我爱是你", "wǒ ài shì nǐ", "My love is you", "love"], ["51020", "我依然爱你", "wǒ yīrán ài nǐ", "I still love you", "love"],
    ["82475", "被爱是幸福", "bèi ài shì xìngfú", "To be loved is happiness", "love"], ["214", "情人节", "qíngrén jié", "Feb 14 — Valentine's Day", "love"],
    ["98", "早安", "zǎo ān", "Good morning", "daily"], ["58", "晚安", "wǎn ān", "Good night", "daily"], ["558", "午安", "wǔ ān", "Good afternoon", "daily"],
    ["456", "是我啦", "shì wǒ la", "It's me!", "daily"], ["510", "我已来", "wǒ yǐ lái", "I'm here", "daily"], ["517", "我要吃", "wǒ yào chī", "I want to eat", "daily"],
    ["526", "我饿啰", "wǒ è luo", "I'm hungry", "daily"], ["246", "饿死了", "è sǐ le", "Starving!", "daily"], ["51396", "我要睡觉了", "wǒ yào shuìjiào le", "I'm going to sleep", "daily"],
    ["918", "加油吧", "jiāyóu ba", "Go for it! / You can do it", "daily"], ["987", "对不起", "duìbuqǐ", "Sorry", "daily"], ["587", "我抱歉", "wǒ bàoqiàn", "I apologise", "daily"],
    ["837", "别生气", "bié shēngqì", "Don't be angry", "daily"], ["548", "无事吧", "wú shì ba", "Are you OK?", "daily"], ["5871", "我不介意", "wǒ bù jièyì", "I don't mind", "daily"],
    ["70345", "请你相信我", "qǐng nǐ xiāngxìn wǒ", "Please believe me", "daily"], ["3Q", "三Q (thank you)", "sān kiù", "Thank you", "internet"],
    ["886", "拜拜了", "bàibài le", "Bye-bye", "bye"], ["88", "拜拜", "bàibài", "Bye-bye (also 发发, double fortune)", "bye"],
    ["596", "我走了", "wǒ zǒu le", "I'm leaving", "bye"], ["5196", "我要走喽", "wǒ yào zǒu lou", "Gotta go", "bye"], ["7998", "去走走吧", "qù zǒuzǒu ba", "Let's go for a walk", "bye"],
    ["666", "溜溜溜", "liù liù liù", "Awesome! Skilful! (gamer praise)", "internet"], ["233", "哈哈哈", "hāhāhā", "LOL (from a laughing emoji code)", "internet"],
    ["555", "呜呜呜", "wū wū wū", "Boo-hoo (crying)", "internet"], ["995", "救救我", "jiùjiù wǒ", "Help me!", "internet"], ["9958", "救救我吧", "jiùjiù wǒ ba", "Please save me", "internet"],
    ["7456", "气死我啦", "qì sǐ wǒ la", "I'm so angry", "rude"], ["748", "去死吧", "qù sǐ ba", "Drop dead (rude)", "rude"], ["250", "二百五", "èrbǎiwǔ", "Idiot / fool (rude)", "rude"],
    ["810", "不要脸", "bù yào liǎn", "Shameless (rude)", "rude"], ["865", "别惹我", "bié rě wǒ", "Don't mess with me", "rude"], ["898", "分手吧", "fēnshǒu ba", "Let's break up", "rude"],
    ["8", "发", "fā", "Prosper — the luckiest number", "money"], ["168", "一路发", "yīlù fā", "Prosper all the way", "money"], ["518", "我要发", "wǒ yào fā", "I will prosper", "money"],
    ["888", "发发发", "fā fā fā", "Triple prosperity", "money"], ["8888", "发发发发", "fā fā fā fā", "Extreme fortune", "money"], ["1688", "一路发发", "yīlù fāfā", "Fortune all the way, doubled", "money"],
    ["28", "易发 (Cantonese)", "yì fā", "Easy fortune", "money"], ["68", "路发", "lù fā", "Road to wealth", "money"], ["99", "久久", "jiǔjiǔ", "Forever and ever", "lucky"],
    ["9999", "久久久久", "jiǔ jiǔ jiǔ jiǔ", "Eternal — a classic wedding and anniversary number", "lucky"], ["6", "顺", "shùn", "Smooth, things go well", "lucky"],
    ["66", "六六大顺", "liùliù dà shùn", "Everything goes smoothly", "lucky"], ["4", "死", "sǐ", "Sounds like death — avoided in floors, plates, phones", "rude"],
    ["14", "要死", "yào sǐ", "Sounds like “want to die” — avoided", "rude"], ["514", "我要死", "wǒ yào sǐ", "Sounds like “I want to die” — avoided", "rude"],
    ["7", "七 / 亲 / 起", "qī", "Kiss, rise, togetherness — mixed luck", "lucky"], ["9", "久", "jiǔ", "Longevity", "lucky"], ["0", "零 / 你", "líng", "Wholeness; “you” in text codes", "lucky"]
  ];
  var MAP = {}; DICT.forEach(function (r) { MAP[r[0]] = r; });
  var PAGES = window.MEANING_PAGES || [];
  function pageLink(code) { return PAGES.indexOf(code) > -1 ? R + "meaning/" + code + "/" : null; }

  var GOOD = { "8": 7, "88": 6, "888": 10, "168": 8, "518": 8, "1688": 8, "66": 4, "666": 6, "99": 4, "999": 5, "9999": 6, "1314": 5, "520": 5, "28": 4, "68": 4, "77": 2, "3344": 4 };
  var BAD = { "14": -6, "514": -8, "74": -5, "748": -10, "250": -6, "44": -6, "7456": -8, "38": -3, "54": -3 };
  var BANDS = [[85, "Imperial luck", "An exceptional combination. Numbers like this sell at a premium."], [70, "Very lucky", "Strong prosperity signals with few weak spots."],
    [55, "Lucky", "Good overall. A few tweaks could push it higher."], [40, "Neutral", "Neither lucky nor unlucky — ordinary in Chinese number culture."],
    [25, "Mixed", "Some unlucky sounds pull this number down."], [0, "Unlucky", "Many buyers in Chinese markets would avoid this number."]];

  function analyse(num, mode) {
    num = String(num).replace(/\D/g, "");
    if (!num) return null;
    var w = 0, f = [];
    num.split("").forEach(function (c) { w += DIG[c].l + (mode === "love" && c === "7" ? 2 : 0) + (mode === "love" && c === "2" ? 1 : 0); });
    var score = 50 + (w / num.length) * 6;
    Object.keys(GOOD).forEach(function (k) { if (k.length > 1 && num.indexOf(k) > -1) { score += GOOD[k]; f.push(["+", k, MAP[k] ? MAP[k][3] : "lucky combination"]); } });
    Object.keys(BAD).forEach(function (k) { if (num.indexOf(k) > -1) { score += BAD[k]; f.push(["−", k, MAP[k] ? MAP[k][3] : "unlucky sound"]); } });
    var last = num.slice(-1);
    if (last === "8") { score += 6; f.push(["+", "ends in 8", "finishing on prosperity"]); }
    else if (last === "9" || last === "6") { score += 3; f.push(["+", "ends in " + last, "a lucky finish"]); }
    else if (last === "4") { score -= 6; f.push(["−", "ends in 4", "finishing on the death sound"]); }
    var run = num.match(/(\d)\1{2,}/g); if (run) run.forEach(function (r) { if (r[0] !== "4") { score += 4; f.push(["+", r, "repeating digits look premium"]); } });
    if (/012|123|234|345|456|567|678|789/.test(num)) { score += 3; f.push(["+", "rising run", "步步高 — step by step higher"]); }
    var fours = (num.match(/4/g) || []).length; if (fours) f.push(["−", fours + "× 4", "each 4 costs points"]);
    score = Math.max(1, Math.min(99, Math.round(score)));
    var band = BANDS.filter(function (b) { return score >= b[0]; })[0];
    return { num: num, score: score, band: band, factors: f };
  }

  /* longest-match reading of a number into known codes, falling back to digit sounds */
  function segment(num) {
    var out = [], i = 0;
    while (i < num.length) {
      var hit = null;
      for (var L = Math.min(8, num.length - i); L >= 2; L--) { var s = num.substr(i, L); if (MAP[s]) { hit = MAP[s]; break; } }
      if (hit) { out.push({ code: hit[0], h: hit[1], en: hit[3] }); i += hit[0].length; }
      else { var c = num[i]; out.push({ code: c, h: DIG[c].s.split(" · ")[0], en: DIG[c].m }); i++; }
    }
    return out;
  }

  function tiles(num) {
    return '<div class="digits">' + num.split("").slice(0, 24).map(function (c, i) {
      var g = DIG[c], cls = g.l > 0 ? "good" : g.l < 0 ? "bad" : "";
      return '<div class="dg ' + cls + '" style="animation-delay:' + i * 50 + 'ms"><div class="n">' + c + '</div><div class="h">' + g.h + '</div><div class="s">' + g.p + "</div><div class=\"s\">" + esc(g.s.split(" · ")[0]) + "</div></div>";
    }).join("") + "</div>";
  }
  function factorList(a) {
    if (!a.factors.length) return '<p class="muted">No strong lucky or unlucky patterns detected.</p>';
    return '<ul class="mb0">' + a.factors.map(function (x) { return "<li><strong>" + x[0] + " " + esc(x[1]) + "</strong> — " + esc(x[2]) + "</li>"; }).join("") + "</ul>";
  }
  function meter(a) { return '<div class="score">' + a.score + '<small style="font-size:1rem;color:var(--muted)">/100</small></div><div class="meter"><i style="width:' + a.score + '%"></i></div><p class="mt"><span class="pill ' + (a.score >= 55 ? "good" : a.score >= 40 ? "mix" : "bad") + '">' + a.band[1] + "</span> " + a.band[2] + "</p>"; }
  function leadBox(topic, num) {
    return '<div class="note mt"><strong>Want the full report?</strong> Get a personalised breakdown with better alternatives, sent free to your inbox. <a class="btn sm mt" style="margin-top:8px" href="' + R + "get-report/?topic=" + encodeURIComponent(topic) + "&number=" + encodeURIComponent(num) + '">Get my free report →</a></div>';
  }

  /* ---------- Tool: decoder ---------- */
  function decoder(root) {
    var form = $("form", root), out = $(".result", root), inp = $("input", root);
    function run(v, quiet) {
      var num = String(v).replace(/\D/g, ""); if (!num) { toast("Type some digits first"); return; }
      var a = analyse(num), exact = MAP[num], seg = segment(num), link = pageLink(num);
      var related = DICT.filter(function (r) { return r[0].length > 1 && r[0] !== num && num.indexOf(r[0]) > -1; }).slice(0, 8);
      out.innerHTML =
        "<h3>“" + num + "” decoded</h3>" +
        (exact ? '<div class="card" style="margin:10px 0"><span class="pill love">Known code</span><h3 class="mt han" style="margin-top:8px">' + exact[1] + '</h3><p><em>' + exact[2] + "</em> — <strong>" + esc(exact[3]) + "</strong></p>" + (link ? '<a href="' + link + '">Full meaning of ' + num + " →</a>" : "") + "</div>" : "") +
        tiles(num) +
        '<h4>Read as a message</h4><p class="han" style="font-size:1.25rem">' + seg.map(function (s) { return '<span title="' + esc(s.en) + '">' + esc(s.h) + "</span>"; }).join(" · ") + '</p><p class="muted">' + seg.map(function (s) { return "<strong>" + s.code + "</strong> " + esc(s.en); }).join(" | ") + "</p>" +
        (related.length ? "<h4>Hidden codes inside</h4><p>" + related.map(function (r) { var l = pageLink(r[0]); return (l ? '<a href="' + l + '">' : "") + "<strong>" + r[0] + "</strong>" + (l ? "</a>" : "") + " " + r[1] + " (" + esc(r[3]) + ")"; }).join("<br>") + "</p>" : "") +
        "<h4>Luck score</h4>" + meter(a) + factorList(a) +
        '<div class="row mt"><button class="btn gold" data-sh>Share this meaning</button><a class="btn ghost" href="' + R + "lucky-number-checker/?n=" + num + '">Check as phone / plate</a></div>' + leadBox("Number meaning", num);
      out.classList.add("show");
      $("[data-sh]", out).onclick = function () { shareIt("What does " + num + " mean in Chinese? Decoded:", location.origin + location.pathname + "?n=" + num); };
      if (!quiet && history.replaceState) history.replaceState(null, "", "?n=" + num);
    }
    form.addEventListener("submit", function (e) { e.preventDefault(); run(inp.value); });
    root.addEventListener("click", function (e) { var t = e.target.closest("[data-try]"); if (t) { inp.value = t.getAttribute("data-try"); run(inp.value); } });
    var q = new URLSearchParams(location.search).get("n"), auto = root.getAttribute("data-auto");
    if (q) { inp.value = q; run(q); } else if (auto) { inp.value = auto; run(auto, true); }
  }

  /* ---------- Tool: lucky checker + generator ---------- */
  function checker(root) {
    var form = $("#chk", root), out = $("#chk-out", root);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var num = form.n.value.replace(/\D/g, ""), mode = form.mode.value; if (!num) { toast("Enter a number"); return; }
      var a = analyse(num, mode);
      out.innerHTML = "<h3>" + esc(form.mode.options[form.mode.selectedIndex].text) + ": " + num + "</h3>" + meter(a) + tiles(num) + "<h4>Why this score</h4>" + factorList(a) +
        '<div class="row mt"><button class="btn gold" id="sh2">Share my score</button><a class="btn ghost" href="' + R + "decoder/?n=" + num + '">Decode the meaning</a></div>' + leadBox(mode, num);
      out.classList.add("show");
      $("#sh2").onclick = function () { shareIt("My number " + num + " scored " + a.score + "/100 on the Chinese lucky-number checker!"); };
    });
    var q = new URLSearchParams(location.search).get("n"); if (q) { form.n.value = q; form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event("submit")); }
    var g = $("#gen", root), gout = $("#gen-out", root);
    g.addEventListener("submit", function (e) {
      e.preventDefault();
      var pre = g.prefix.value.replace(/\D/g, ""), len = Math.max(pre.length + 1, Math.min(12, +g.len.value || 8)), seen = {}, list = [];
      var pool = "8888866699901235", tails = ["8", "88", "168", "518", "888", "99", "66", "1314", "520", "9"];
      for (var t = 0; t < 4000 && list.length < 60; t++) {
        var tail = tails[t % tails.length], mid = "";
        while (pre.length + mid.length + tail.length < len) mid += pool[Math.floor(Math.random() * pool.length)];
        var n = (pre + mid + tail).slice(0, len); if (seen[n]) continue; seen[n] = 1; list.push(analyse(n));
      }
      list.sort(function (x, y) { return y.score - x.score; });
      gout.innerHTML = '<div class="tbl-wrap"><table class="tbl"><tr><th>Number</th><th>Score</th><th></th></tr>' + list.slice(0, 10).map(function (x) {
        return "<tr><td><strong>" + x.num + "</strong></td><td>" + x.score + " · " + x.band[1] + '</td><td><a href="' + R + "decoder/?n=" + x.num + '">Meaning</a></td></tr>';
      }).join("") + '</table></div><p class="hint mt">Generated ideas only — check availability with your carrier, registry or plate office. Want help sourcing a premium number? <a href="' + R + 'get-report/?topic=Premium%20number%20sourcing">Ask us</a>.</p>';
      gout.classList.add("show");
    });
  }

  /* ---------- Tool: love code ---------- */
  function hash(s) { var h = 2166136261; for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); } return Math.abs(h); }
  function love(root) {
    var qs = new URLSearchParams(location.search), card = $("#love-card", root);
    function showCard(code, from, to) {
      var r = MAP[code] || ["", segment(code).map(function (s) { return s.h; }).join(" "), "", segment(code).map(function (s) { return s.en; }).join(" · ")];
      card.innerHTML = '<div class="lovecard"><p>' + (to ? "For " + esc(to) + " 💌" : "A secret number message") + '</p><div class="code">' + esc(code) + '</div><p class="han" style="font-size:1.4rem">' + esc(r[1]) + "</p><p>" + esc(r[3]) + "</p>" + (from ? "<p>— from " + esc(from) + "</p>" : "") +
        '<div class="row" style="justify-content:center"><button class="btn gold" id="lc-share" style="flex:0 1 auto">Send this code</button><a class="btn ghost" style="flex:0 1 auto;color:#fff!important;border-color:#fff" href="' + R + 'love-code/">Make your own</a></div></div>';
      card.classList.add("show");
      $("#lc-share").onclick = function () {
        var u = location.origin + location.pathname + "?c=" + encodeURIComponent(code) + (from ? "&from=" + encodeURIComponent(from) : "") + (to ? "&to=" + encodeURIComponent(to) : "");
        shareIt("I sent you a secret Chinese number code 💌 Can you decode " + code + "?", u);
      };
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (qs.get("c")) showCard(qs.get("c").replace(/[^\dQ]/g, "").slice(0, 20), (qs.get("from") || "").slice(0, 40), (qs.get("to") || "").slice(0, 40));
    var lc = $("#calc", root), lout = $("#calc-out", root);
    lc.addEventListener("submit", function (e) {
      e.preventDefault();
      var a = lc.a.value.trim(), b = lc.b.value.trim(); if (!a || !b) return;
      var key = [a.toLowerCase(), b.toLowerCase()].sort().join("|"), pct = 40 + hash(key) % 60;
      var code = pct >= 97 ? "5201314" : pct >= 90 ? "1314" : pct >= 80 ? "520" : pct >= 70 ? "707077" : pct >= 60 ? "530" : "258";
      lout.innerHTML = '<div class="center"><div class="score" style="color:var(--pink)">' + pct + '%</div><div class="meter"><i style="width:' + pct + '%;background:linear-gradient(90deg,#f9a,#e8447a)"></i></div><p class="mt">' + esc(a) + " ❤ " + esc(b) + " — your love code is <strong>" + code + "</strong> (" + esc(MAP[code][3]) + ')</p><button class="btn pink" id="lc-send">Send ' + code + " to " + esc(b) + "</button><p class=\"hint mt\">Just for fun — real love is not a number.</p></div>";
      lout.classList.add("show");
      $("#lc-send").onclick = function () { showCard(code, a, b); };
    });
    var bld = $("#builder", root), picked = [];
    bld.addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return; e.preventDefault();
      picked.push(c.getAttribute("data-c")); $("#built", root).textContent = picked.join("");
    });
    $("#b-clear", root).onclick = function (e) { e.preventDefault(); picked = []; $("#built", root).textContent = "—"; };
    $("#b-send", root).onclick = function (e) {
      e.preventDefault(); if (!picked.length) { toast("Tap a few phrases first"); return; }
      showCard(picked.join(""), $("#b-from", root).value.trim(), $("#b-to", root).value.trim());
    };
  }

  /* ---------- Tool: dictionary ---------- */
  function dictionary(root) {
    var q = $("#q", root), list = $("#list", root), cat = "all";
    var names = { love: "Love", daily: "Daily", bye: "Goodbye", internet: "Internet", money: "Wealth", lucky: "Lucky", rude: "Rude / avoid" };
    function render() {
      var s = q.value.trim().toLowerCase();
      var rows = DICT.filter(function (r) { return (cat === "all" || r[4] === cat) && (!s || (r.join(" ").toLowerCase().indexOf(s) > -1)); });
      list.innerHTML = rows.length ? rows.map(function (r) {
        var l = pageLink(r[0]);
        return "<tr><td><strong>" + (l ? '<a href="' + l + '">' + r[0] + "</a>" : r[0]) + '</strong></td><td class="han">' + r[1] + "<br><small class=\"muted\">" + r[2] + "</small></td><td>" + esc(r[3]) + '</td><td><span class="pill ' + (r[4] === "rude" ? "bad" : r[4] === "love" ? "love" : "good") + '">' + names[r[4]] + "</span></td></tr>";
      }).join("") : '<tr><td colspan="4">No match. Try the <a href="' + R + 'decoder/">decoder</a> — it reads any number.</td></tr>';
      $("#count", root).textContent = rows.length + " codes";
    }
    q.addEventListener("input", render);
    $("#cats", root).addEventListener("click", function (e) {
      var c = e.target.closest(".chip"); if (!c) return;
      d.querySelectorAll("#cats .chip").forEach(function (x) { x.classList.remove("on"); }); c.classList.add("on"); cat = c.getAttribute("data-cat"); render();
    });
    render();
  }

  /* ---------- Tool: zodiac ---------- */
  var CNY = window.CNY_DATES || [];
  var ANIMALS = [["Rat", "鼠", "2, 3"], ["Ox", "牛", "1, 4"], ["Tiger", "虎", "1, 3, 4"], ["Rabbit", "兔", "3, 4, 6"], ["Dragon", "龙", "1, 6, 7"], ["Snake", "蛇", "2, 8, 9"],
    ["Horse", "马", "2, 3, 7"], ["Goat", "羊", "2, 7"], ["Monkey", "猴", "1, 7, 8"], ["Rooster", "鸡", "5, 7, 8"], ["Dog", "狗", "3, 4, 9"], ["Pig", "猪", "2, 5, 8"]];
  var EL = ["Wood", "Wood", "Fire", "Fire", "Earth", "Earth", "Metal", "Metal", "Water", "Water"];
  function zYear(date) {
    var y = date.getFullYear(), iso = date.toISOString().slice(0, 10), idx = y - 1924;
    if (idx >= 0 && idx < CNY.length && iso < CNY[idx]) y--;
    return y;
  }
  function zodiac(root) {
    var f = $("#z", root), out = $("#z-out", root);
    f.addEventListener("submit", function (e) {
      e.preventDefault(); if (!f.dob.value) return;
      var y = zYear(new Date(f.dob.value + "T12:00:00Z")), a = ANIMALS[((y - 1924) % 12 + 12) % 12], el = EL[((y - 4) % 10 + 10) % 10];
      out.innerHTML = '<div class="center"><div style="font-size:4rem" class="han">' + a[1] + "</div><h3>" + el + " " + a[0] + "</h3><p>Chinese zodiac year " + y + " · Lucky numbers: <strong>" + a[2] + '</strong></p><a class="btn" href="' + R + "get-report/?topic=Zodiac%20lucky%20numbers&number=" + y + '">Get my zodiac lucky-number report</a></div>';
      out.classList.add("show");
    });
    var c = $("#compat", root), cout = $("#compat-out", root);
    var TRINE = [[0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11]], SECRET = [[0, 1], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]], CLASH = [[0, 6], [1, 7], [2, 8], [3, 9], [4, 10], [5, 11]];
    function has(list, x, y) { return list.some(function (g) { return g.indexOf(x) > -1 && g.indexOf(y) > -1; }); }
    c.addEventListener("submit", function (e) {
      e.preventDefault(); var x = +c.a.value, y = +c.b.value, s, t;
      if (x !== y && has(SECRET, x, y)) { s = 95; t = "Secret friends (六合) — one of the strongest traditional matches."; }
      else if (x !== y && has(TRINE, x, y)) { s = 90; t = "Harmony trine (三合) — naturally aligned goals and values."; }
      else if (has(CLASH, x, y)) { s = 38; t = "Opposites (六冲) — tradition calls this a clash; it takes extra work."; }
      else if (x === y) { s = 74; t = "Same sign — you understand each other, sometimes too well."; }
      else { s = 62 + (x * 7 + y * 3) % 12; t = "Neutral pairing — compatible with effort and communication."; }
      cout.innerHTML = '<div class="center"><div class="score">' + s + '%</div><p>' + ANIMALS[x][0] + " " + ANIMALS[x][1] + " ❤ " + ANIMALS[y][0] + " " + ANIMALS[y][1] + "</p><p>" + t + "</p></div>";
      cout.classList.add("show");
    });
  }

  /* ---------- Tool: red envelope ---------- */
  var ENV = {
    cny: ["Chinese New Year", { child: [88, 168, 188], family: [288, 600, 888], staff: [168, 288, 666], parent: [888, 1688, 2888] }],
    wedding: ["Wedding", { child: [520, 666, 888], family: [1314, 1888, 6666], staff: [600, 800, 1000], parent: [5200, 8888, 9999] }],
    birthday: ["Birthday", { child: [99, 168, 199], family: [520, 999, 1314], staff: [200, 288, 388], parent: [999, 1688, 2999] }],
    baby: ["New baby / full month", { child: [168, 288, 388], family: [666, 888, 1688], staff: [200, 288, 388], parent: [888, 1888, 2888] }],
    grad: ["Graduation / exams", { child: [168, 288, 666], family: [666, 888, 1688], staff: [200, 288, 388], parent: [888, 1688, 2888] }],
    business: ["Business opening", { child: [168, 288, 518], family: [888, 1688, 2888], staff: [518, 888, 1688], parent: [1688, 8888, 18888] }]
  };
  function envelope(root) {
    var f = $("#env", root), out = $("#env-out", root);
    f.addEventListener("submit", function (e) {
      e.preventDefault(); var o = ENV[f.occ.value], amts = o[1][f.rel.value];
      out.innerHTML = "<h3>" + o[0] + ": suggested amounts</h3><div class=\"grid g3\">" + amts.map(function (v, i) {
        var a = analyse(String(v)); return '<div class="card center"><span class="pill">' + ["Modest", "Generous", "Grand"][i] + '</span><div class="score">' + v + '</div><p>' + (MAP[String(v)] ? MAP[String(v)][3] : a.band[1]) + "</p></div>";
      }).join("") + '</div><p class="hint mt">Amounts in your local currency unit. Avoid any 4; prefer even totals for happy occasions; new, crisp notes are expected. Customs differ by region and family — when in doubt, ask.</p>';
      out.classList.add("show");
    });
  }

  window.N707 = { analyse: analyse, segment: segment, DICT: DICT, DIG: DIG };
  var map = { decoder: decoder, checker: checker, love: love, dictionary: dictionary, zodiac: zodiac, envelope: envelope };
  Array.prototype.forEach.call(d.querySelectorAll("[data-tool]"), function (el) { var fn = map[el.getAttribute("data-tool")]; if (fn) fn(el); });
})();
