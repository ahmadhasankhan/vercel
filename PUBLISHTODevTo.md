`npm run devto -- whats-new-in-ruby-4`


It prints the dev.to link. Once you've previewed it there, run:
`npm run devto -- whats-new-in-ruby-4 --publish`

Other ways to use it:

npm run devto -- --all sends every blog post as a draft. Add --publish to publish them all.
npm run devto -- <slug> --dry-run writes the converted Markdown to a preview file without posting anything.

What the script does:

Converts the post: it turns the JSX in your MDX into plain Markdown and makes every link a full asistensia.com address. I checked the Ruby 4.0 post with a dry run: headings, lists, links, code blocks and indentation all come out clean.
Keeps your site as the original: each post has its canonical URL set to asistensia.com, uses your cover image, and ends with a footer: "Originally published on the Asistensia blog", plus your Calendly link.
Never makes duplicates: it saves each dev.to article ID in scripts/devto-articles.json. Running it again on the same post updates that article. Commit this file so the IDs are kept.
Tags: dev.to allows 4. The script uses a devto_tags line in the post if there is one, and otherwise cleans up your normal tags. I gave the Ruby post ruby, rails, programming, webdev.

The new files are scripts/devto.mjs, a devto command in package.json, and a .gitignore entry for the preview files. None of it is committed yet.