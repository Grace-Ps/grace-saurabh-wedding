# Grace and Saurabh Wedding

A classy wedding website for Grace and Saurabh's marriage celebration on November 14, 2026 at Carmel Hall, Chittor Road, Ernakulam from 11 AM onwards. It also includes a gallery area ready for register-marriage and other photographs.

## Website

Open `index.html` directly in a browser, or serve the project locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Guest Wishes

Guest wishes are sent to a Google Sheet that only you can open from your Google account. To connect it:

1. Create a Google Sheet while signed into the account where you want to receive wishes.
2. Copy the spreadsheet ID from its URL (`https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`). Open **Extensions > Apps Script** in that sheet, replace the editor contents with `google-apps-script/Code.gs`, and set `SPREADSHEET_ID` to that ID.
3. Choose **Deploy > New deployment**, select **Web app**, set **Execute as** to **Me**, and set access to **Anyone** so guests can submit without signing in. The script only accepts submissions; it does not expose a read endpoint. Keep the spreadsheet itself private.
4. Deploy and copy the Web app URL ending in `/exec`.
5. In `script.js`, set `GUESTBOOK_ENDPOINT` to the `/exec` URL and redeploy the website. The form waits for an explicit saved response from Apps Script and only shows the thank-you after the Sheet write succeeds.

The Apps Script project writes each submission to a `Wishes` tab in the Sheet. Open the Sheet directly to read messages. The website intentionally has no public wishes-list page. The endpoint URL is public so the form can submit; the Sheet remains private. The included honeypot is basic spam reduction, not abuse-proofing.

## Host on GitHub Pages

This repository includes an automatic GitHub Pages deployment workflow in `.github/workflows/pages.yml`.

1. Create an empty repository on GitHub, for example `grace-saurabh-wedding`.
2. Connect this folder and push the project:

```sh
git add .
git commit -m "Create wedding website"
git remote add origin https://github.com/YOUR_USERNAME/grace-saurabh-wedding.git
git push -u origin main
```

3. In GitHub, open **Settings > Pages** and set **Source** to **GitHub Actions**.
4. Open the **Actions** tab and wait for the deployment to finish. GitHub will show the live Pages URL in the workflow summary.

## Run

```sh
python -m saurabh_grace_wedding.main
```

From the repository root, set the source path first if the package is not installed:

```sh
PYTHONPATH=src python -m saurabh_grace_wedding.main
```

## Test

```sh
PYTHONPATH=src python -m unittest discover -s tests -v
```
