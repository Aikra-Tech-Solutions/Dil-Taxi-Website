# DilTaxi Website: Vercel Deployment Workflow

The DilTaxi landing page lives in the `WebSite` folder of the existing repository. It is a React + Vite app. This guide deploys **only that folder** to Vercel. The backend and frontend deployments are not touched.

## Exact Vercel settings

| Setting | Value |
| --- | --- |
| Git repository | the existing Trip360 repository on GitHub |
| Root Directory | `WebSite` |
| Framework Preset | Vite |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Environment variables | none needed |

`WebSite/vercel.json` already contains the same build, install and output settings, so Vercel picks them up automatically.

## Why Root Directory matters

The repository holds several projects (`backend`, `frontend`, `mobile`, `WebSite`). Vercel looks for `package.json` in the Root Directory. If you leave it as the repository root, Vercel finds no website there (or builds the wrong project) and the build fails. Setting Root Directory to `WebSite` tells Vercel: "only install, build and serve what is inside this folder". Everything outside it is ignored.

## Step by step

### 1. Push the project to GitHub
Check the branch and the changes first:
```bash
git status
git branch --show-current
```
Push the Day 11 branch (only after you have reviewed the changes):
```bash
git push -u origin feature/day11-diltaxi
```
Open a pull request on GitHub and merge it when you are happy. Vercel can deploy any branch, but production normally follows your main branch.

### 2. Log in to Vercel
Go to https://vercel.com and choose **Continue with GitHub**. Authorize Vercel when GitHub asks.

### 3. Import the existing GitHub repository
Click **Add New... > Project**. If you do not see your repository, click **Adjust GitHub App Permissions** and give Vercel access to it.

### 4. Select the repository
Find the Trip360 repository in the list and click **Import**.

### 5. Configure the Root Directory
Next to "Root Directory" click **Edit**, choose `WebSite`, and confirm.

### 6. Select Vite as the framework
Set **Framework Preset** to **Vite** (Vercel usually detects it after step 5).

### 7. Configure build command and output directory
Open **Build and Output Settings** and make sure:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

### 8. Deploy
Click **Deploy**. The first build takes about a minute.

### 9. Verify the deployment URL
When it finishes, Vercel shows a URL such as `https://your-project.vercel.app`. Open it and check:
- the DilTaxi page loads with the logo and all sections
- the navigation links scroll to the right sections
- the page looks right on your phone

### 10. How future pushes redeploy
Vercel is connected to the repository:
- A push to the **production branch** (normally `main`) creates a new production deployment.
- A push to any other branch or a pull request creates a **preview deployment** with its own URL.
You do not need to deploy manually again.

## Test the build locally first
```bash
cd WebSite
npm install
npm run build
npm run preview
```

## Troubleshooting

| Problem | Likely cause and fix |
| --- | --- |
| "No package.json found" or the wrong project builds | Root Directory is not `WebSite`. Edit it in Project Settings > General, then redeploy. |
| `vite: command not found` | Dependencies did not install. Check Install Command is `npm install` and that `package.json` is committed. |
| Build fails with a JS error | Run `npm run build` locally, fix the error, commit and push. |
| "No Output Directory named dist" | Set Output Directory to `dist` (Vite's default). |
| 404 on the deployed site | Output Directory is wrong, or the wrong Root Directory was built. |
| Repository not listed | Give Vercel access in GitHub: Settings > Applications > Vercel > Repository access. |
| Old content still showing | Hard refresh (Ctrl+Shift+R) and check the latest deployment is marked "Ready". |
| Node version error | In Project Settings > General, set Node.js Version to 20.x or 22.x. |

## Safety notes
- Never commit `.env` files or secrets. This website needs none.
- Do not change the existing backend or frontend deployment settings when setting up this project.
