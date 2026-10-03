# Qorlyxen Technology

AI Growth & Automation Company · Kathmandu, Nepal

- Public website: [Qorlyxen Technology](https://subaskhatri4.github.io/qorlyxen-technologies/)
- Website source: [GitHub repository](https://github.com/subaskhatri4/qorlyxen-technologies)
- Owner Studio: `__STUDIO_URL__` — replace this placeholder only after its published address is confirmed.

## Owner setup

The public website runs on GitHub Pages. A separate Floot Studio provides Google login, content editing, project management and image storage. The Studio is awaiting publication and connection to the website. A successful owner login has not yet been verified.

Once the Studio address is confirmed:

1. Open `__STUDIO_URL__/admin`, or use **Owner login** on the public website.
2. Choose Google sign-in and use **your owner Google account**. The server restricts editing to this account.
3. Check that the editor opens, save one small change, and refresh the public website to confirm it appears.
4. Sign out when finished. Visitors can view the website without signing in.

The Google sign-in step needs the owner's participation. Do not put passwords, Google tokens or other secrets into the website files.

## Update the website

The Studio's website editor covers 157 text and link fields, including navigation, headings, service descriptions, contact details, social links, page title and description. Edit the required fields and save. Connected visitors receive saved content when they reload the page; ordinary content updates do not require a GitHub code change.

The company name is **Qorlyxen Technology**. TikTok links to [@subaskhatrii](https://www.tiktok.com/@subaskhatrii). WhatsApp and API Docs links have been removed.

Use the project editor to add a real project: enter its title, category, factual description, optional verified live link and preview image. Save it as a draft while preparing it, then make it visible when ready. Hidden projects are excluded from the public website. No completed projects, client names or results have been invented.

Project and founder image uploads accept **JPG, PNG or WebP, up to 5 MB each**. Images are stored privately; the public website can display the selected founder photo and images belonging to visible projects. Do not publish a photo you are not authorized to use.

The founder portrait is awaiting an actual photo. Instagram's `@subaskhatrii` profile requires login and age verification, so its photo could not be retrieved publicly. Upload the original founder photo in the Studio; a professional AI portrait should preserve that person's identity and use the real photo as its input.

**छोटो निर्देशन:** Owner login खोल्नुहोस् → आफ्नो owner Google account बाट Google sign-in गर्नुहोस् → सामग्री वा project सच्याएर save गर्नुहोस्। Project तयार भएपछि मात्र visible गर्नुहोस्।

## Run locally

Open `index.html` in a modern browser to view the built-in website content. No installation or build step is required.

For a local web server, run this from the website folder:

```sh
python -m http.server 4173
```

Then open [localhost:4173](http://localhost:4173/).

The content service allows browser requests from the public GitHub website and from `http://localhost:4173` or `http://127.0.0.1:4173`. A local web server at that port can load saved content after the Studio is connected. Opening the file directly shows the built-in defaults if the browser blocks the content request.

## Connect and publish updates

After the Studio is published, set `PROJECT_STUDIO` in `script.js` to its verified HTTPS origin, without a trailing slash. Replace `__STUDIO_URL__` in this README with that same origin. The website reads `/_api/public/content` and links owner access to `/admin`.

Commit updated website files to the GitHub repository's `main` branch. GitHub Pages serves the repository root. Local file changes alone do not update the public website.

Studio code changes must be published separately through Floot. Saved website text and project records live in its database and do not need a new deployment for each edit.

## Files and services

| Item | Purpose |
| --- | --- |
| `index.html` | Website structure and built-in default content |
| `styles.css` | Responsive layout and visual design |
| `script.js` | Public content loading, project cards and navigation |
| `favicon.svg` | Website icon |
| Floot Studio | Owner login, editor, database and image storage |

Floot project ID: `2acbae73-eddc-49ba-affa-94f7a75594ae`. Its final public address remains unconfirmed. This package contains the public website files; the Studio is maintained separately.
