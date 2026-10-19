# pra1608.github.io
## Publishing a research report critique

The blog at `/blog/` is built by GitHub Pages (Jekyll) from Markdown files in `_posts/`.

1. Open `_drafts/report-critique-template.md` and copy its contents.
2. On GitHub, go to the `_posts/` folder → **Add file → Create new file**
   (on the first post, type `_posts/` in front of the file name to create the folder).
3. Name it `YYYY-MM-DD-short-title.md`, e.g. `2026-10-12-abc-ltd-initiation.md`.
4. Paste the template, fill in the front matter (company, broker, rating,
   target, price, verdict, scores) and write the critique below the `---`.
5. Commit. The post appears on `/blog/`, in the homepage "Research Report
   Critiques" section and in the RSS feed (`/blog/feed.xml`) in a minute or two.

Images: upload them to `images/blog/` and reference them as `![caption](/images/blog/file.png)`.

## Updating the complex securities course

The course page is `learn/complex-securities/index.html`. The tutor itself is the public skill at
`_skills/complex-securities-tutor/SKILL.md`.

Edit `SKILL.md` (on GitHub or locally) and commit to `main`. The **Package course skill** workflow rebuilds
`learn/complex-securities/complex-securities-tutor.zip` and `course-prompt.txt` automatically.
Locally you can run `python3 scripts/package-skill.py` instead.

## Résumé requests

The résumé is no longer public. "Request Résumé" opens a form whose answers are emailed to
prakharjain.oist@gmail.com by [FormSubmit](https://formsubmit.co) (free, no account).

- **First time only:** FormSubmit sends an "Activate form" email after the first request. Click it,
  or requests won't be delivered.
- **To approve:** reply to the request email (the reply goes to the requester) with the PDF attached,
  or with a Google Drive link shared only with their email address.
- **Your log:** search your inbox for "Résumé request".
