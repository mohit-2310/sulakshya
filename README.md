# Sulakshya Airtech Solution — Website

A fast, mobile-friendly, SEO-ready multi-page site. Everything is plain HTML/CSS/JS — no build step, no server code. Just upload the files.

## Files
```
index.html              Home page
screw-compressors.html  Product page (targets "screw air compressor")
air-dryers.html         Product page (targets "air dryer")
air-receivers.html      Product page (targets "air receiver")
service-spares.html     Product page (targets "compressor service & spares")
styles.css              Shared styles for all pages
main.js                 Shared scripts (animations, form, FAQ)
assets/                 Logo, product images, industry photos, social image
sitemap.xml             List of pages for search engines
robots.txt              Tells search engines they may crawl the site
```

## 1) The contact form
The form is already connected to your Web3Forms key, so inquiries are emailed automatically.
- Key in use (in `main.js`): `f8284f25-7817-49d2-b06d-a1b4d061ec81`
- Inquiries go to the email on your Web3Forms account. To send them to `sulakshya.airtech@gmail.com`,
  log in at web3forms.com → open this form → set the recipient email.
- Note: the form only sends from a real hosted URL or when the file is opened in your browser — not inside a preview window.

## 2) Put it online (free)

### Option A — GitHub Pages
1. Create a repo at github.com and upload **all files and the `assets` folder** (keep the structure).
2. Settings → Pages → Source: `main` branch, `/(root)` → Save.
3. Your site goes live at `https://yourusername.github.io/reponame/`.

### Option B — Netlify (easiest)
1. Go to app.netlify.com/drop and drag this whole folder onto the page. It's live instantly.

## 3) Use your own domain (e.g. www.sulakshya.com)
Once connected, visitors only ever see your domain — the host's name never appears.
1. Buy the domain from any registrar (Namecheap, GoDaddy, Hostinger).
2. **GitHub:** Settings → Pages → Custom domain → enter `www.sulakshya.com`.
   **Netlify:** Domain settings → Add custom domain.
3. At your registrar's DNS settings, add the records your host shows you
   (a CNAME for `www`, plus A-records for the bare domain). The host displays the exact values.
4. Turn on **HTTPS / Enforce HTTPS** so it loads as `https://`.

### IMPORTANT after you pick the final domain
The pages reference `https://www.sulakshya.com` in several SEO tags. If your final domain
is different, do a find-and-replace of `https://www.sulakshya.com` across all `.html` files,
`sitemap.xml`, and `robots.txt`, and re-upload.

## 4) Get found in search (the part that actually moves rankings)
Ranking #1 isn't something any code can guarantee — it's earned over time. In order of impact:

1. **Google Business Profile (do this first).** Free, highest impact for a regional manufacturer.
   Create it at google.com/business with your Kishangarh address, photos, hours and phone.
   This is what puts you on Google Maps and in local "near me" searches.
2. **Submit your site to Google.** Add it at search.google.com/search-console, verify ownership,
   and submit `sitemap.xml`. This tells Google your pages exist.
3. **List on B2B directories.** IndiaMART, TradeIndia, Justdial. Buyers search these directly,
   and the links to your site help your rankings.
4. **Add real content over time.** Application notes, case studies, "how to size a compressor".
   Depth and freshness build authority over months.

You've already got the technical foundation: per-product pages, structured data
(LocalBusiness + Product + FAQ), a sitemap, fast mobile pages and a social share image.
The list above is the off-site work that compounds from here.
