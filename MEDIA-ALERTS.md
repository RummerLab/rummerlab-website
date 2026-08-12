# Athletes of the Reef — media alert processing

Agent workflow for one-off (or batch) processing of media/news alerts in `athletesofthereef@gmail.com`, then updating the RummerLab website catalogue and opening a PR.

**Trigger:** the user asks you to read this file and process the mailbox (or a named email / PDF / digest).

Follow [`AGENTS.md`](AGENTS.md) for stack, spelling (**RummerLab** one word), and Mo'orea / science4reefs fieldwork rules.

Treat this file as living documentation: update it when the mailbox sources, `media.json` shape, or notification rules change.

## Goal

1. Authenticate Gmail as `athletesofthereef@gmail.com`.
2. Read Inbox media alerts and related forwards.
3. Extract credible coverage of **Jodie Rummer**, **RummerLab**, **Physioshark**, or **Athletes of the Reef**.
4. Add or collate items in [`data/media.json`](data/media.json) (helpers in [`data/media.ts`](data/media.ts), types in [`types/media.ts`](types/media.ts)).
5. `npm run lint` and `npm run build`.
6. Commit, push, and open a PR on [RummerLab/rummerlab-website](https://github.com/RummerLab/rummerlab-website).
7. Notify Luen + Jodie **only** when the email produced new catalogue items; then archive processed mail.

Do **not** merge the PR unless asked. Do **not** update Scholar, jodierummer.com, Hermes/OpenClaw jobs, or revive old scrapers unless the user explicitly asks in that chat.

## Prereqs

- Workspace: this repo on latest `main` (pull first).
- Branch: create something like `chore/media-gmail-catchup-YYYYMMDD` (or reuse a name the user gives).
- Gmail MCP authenticated as `athletesofthereef@gmail.com`. If not, **stop and say so**. Do not ask for a password.
- Prefer Gmail tools: `search_threads`, `get_thread` / `get_message` (`PLAIN_TEXT`), `unlabel_thread` (archive), `reply` / `forward` when notifying.

## Inbox sources to process

Process **Inbox** unless a thread is clearly related. Read **full bodies and attachments** (PDFs, docs). Snippets are not enough — open every PDF page when needed.

| Source | How to find |
| --- | --- |
| Google Alerts | `from:googlealerts-noreply@google.com` OR `subject:"Google Alert"` |
| RummerLab media digest | `subject:"RummerLab media digest"` (from the [media-alerts](https://github.com/RummerLab/media-alerts) Docker digest) |
| Scholar alerts | `from:scholaralerts-noreply@google.com` (only if about Jodie/lab media; still do not edit Scholar unless asked) |
| Jodie | `jodie.rummer@jcu.edu.au` and other addresses you find |
| Luen | Forwards, “please add this”, JCU online/print summaries, Isentia/MediaPortal PDFs |
| Other | Forwarded media-monitoring / Talkwalker / press summaries naming Jodie or the lab |

## Include vs skip

**Include** if credible and about Jodie, RummerLab, Physioshark, Athletes of the Reef, or lab research (physiology, sharks, reef climate, conservation comms, ACRS leadership, etc.).

**Skip**

- Duplicates already in `data/media.json` (same URL, or same outlet + title + date).
- Syndicated copies of a story already listed — **collate** into `sources[]` on the strongest public primary instead of new cards when it is the same story.
- Grants/funding noise.
- Sensational shark-attack coverage unless Jodie/the lab is quoted or needed for comms tracking (keep factual).
- Weak Google Alert noise, unrelated JCU items.
- Own-site loops (`rummerlab.com`, `jodierummer.com`, `physioshark.org`) unless the user asks.

**Radio/TV firehoses:** dozens of ABC/WIN syndications of one interview → one card (or one primary + key outlets in `sources[]`), not one card per station.

## URL hygiene

- Unwrap `google.com/url` and Google News / Alert redirects; store the canonical article/video URL.
- Prefer outlet URLs over `news.google.com/rss/articles/...` wrappers when the outlet link is available.
- Strip `utm_*`, `fbclid`, `gclid`, `mc_cid`, `mc_eid`, `btr`, `giftid`.
- Expand `youtu.be` → `https://www.youtube.com/watch?v=...`.
- **Never** publish MediaPortal / Isentia / session / private playback links.
- If there is no durable public URL, omit `url` (or leave it unset) rather than storing a private link.
- Do not replace a good article URL with a paywall/login/consent dead-end.

## Catalogue shape (`data/media.json`)

Each item:

| Field | Notes |
| --- | --- |
| `type` | `article` \| `interview` \| `podcast` \| `press` |
| `source` | Primary outlet name (strongest public outlet) |
| `title` | Headline |
| `description` | 1–2 sentences; prefer a real quote or research point |
| `url` | Optional durable public URL |
| `date` | ISO `YYYY-MM-DD` |
| `sourceType` | `The Conversation` \| `ABC News` \| `CNN` \| `Science Podcast` \| `Research Highlight` \| `The Guardian` \| `Other` |
| `sources` | Optional syndications / language editions / sister outlets |
| `image` | Optional; only if a stable public image URL exists |

`sources[]` entries: `{ name, url?, title?, sourceType? }`.

Same-name outlets with **different URLs** (e.g. Conversation EN + FR) are kept. Same name with no new URL is dropped by `getMediaSources`.

Do not invent URLs, dates, or quotes. Leave existing items unless they are clear duplicates of something you are adding.

## Edit → validate → PR

1. Update `data/media.json` only (unless UI bugs block the new items).
2. Run and fix:

```bash
npm run lint
npm run build
```

3. Ensure the diff has no secrets, tokens, or private URLs.
4. Commit with a concise why-focused message.
5. Push the branch and open a PR (`gh pr create`). Do not merge unless asked.

PR body should summarize added cards, collated `sources[]`, and any blockers left in Inbox.

## Email notifications (Alex Morgan)

After the PR exists:

- **If that email produced new catalogue items** (new card or new `sources[]` entry): reply or forward to **both** Luen and Jodie, say you added the coverage and link the PR, then archive.
- **If no action** (already catalogued or skipped with reason): archive only — **no** reply/forward.
- Sign as:

```text
Alex Morgan
Athletes of the Reef
via Cursor
```

- Recipients: Luen (`luenwarneke@gmail.com`) and Jodie (`jodie.rummer@jcu.edu.au`).
- **Never reply** to `googlealerts-noreply@…` or `scholaralerts-noreply@…` (forward a summary to Luen+Jodie instead if those alerts produced additions).
- Do not email anyone else unless the user asks.

## Archive rules

Archive = remove `INBOX` (and usually `UNREAD`) via `unlabel_thread`.

Archive only when that message has a deliberate outcome: items added, already in `media.json`, or skipped with a reason.

If blocked (paywall, missing attachment, Gmail tool failure), **leave it in Inbox** and report it.

## Chat deliverable

List:

- Added items (title, source, date, URL)
- Collated sources (parent title ← outlet)
- Skipped (reason)
- Archived message IDs/subjects
- Leftover Inbox items / blockers
- PR URL

## Related systems (out of scope unless asked)

| System | Role |
| --- | --- |
| [RummerLab/media-alerts](https://github.com/RummerLab/media-alerts) | Daily RSS/API digest emailed to this Gmail |
| Scholar (`RummerLab/scholar`) | Long-term full archive; do not edit unless asked |
| Talkwalker / Google Alerts | Complementary watches; process their emails here |
| jodierummer.com | Personal curated highlights; separate repo |

## Example user prompt

```text
Read MEDIA-ALERTS.md and process the athletesofthereef Inbox for media about
Jodie / RummerLab / Physioshark. Open a PR. Notify Luen and Jodie only for
emails that produced new media.json items, then archive.
```

Or for a single message:

```text
Read MEDIA-ALERTS.md. Process Gmail FMfcgz… (or subject "RummerLab media digest — …")
and open a PR if anything is missing from media.json.
```
