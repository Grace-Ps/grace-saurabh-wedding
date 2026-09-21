# Grace and Saurabh Wedding

A classy wedding website for Grace and Saurabh's marriage celebration on November 14, 2026 at Carmel Hall, Chittor Road, Ernakulam from 11 AM onwards. It also includes a gallery area ready for register-marriage and other photographs.

## Website

Open `index.html` directly in a browser, or serve the project locally:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

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
