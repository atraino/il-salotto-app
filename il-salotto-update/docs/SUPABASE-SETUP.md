# Turning on the database

The app runs fine without this: it shows the sample room and saves nothing. These steps give it a
real database, real sign-in, and notes that persist and are shared between members.

About twenty minutes, all in the browser. Nothing here costs money.

## 1. Make the project

1. Go to [supabase.com](https://supabase.com) and sign in with GitHub.
2. **New project**. Name it `il-salotto`. Choose a region near your members: **Frankfurt** if that's
   mostly Italy and Europe.
3. It gives you a database password. Save it in your password manager. You won't need it for this
   app, but you'll want it one day.
4. Wait about two minutes while it builds.

## 2. Create the tables

1. Open **SQL Editor** in the left sidebar, then **New query**.
2. Open `supabase/schema.sql` from this repo, copy all of it, paste it in, and press **Run**.
3. It should say success. Under **Table Editor** you'll now see `profiles`, `notes`, `posts`, and
   `hearts`.

That file also switches on row level security, which is what stops one member from editing another
member's notes. It's already written; you don't need to configure anything.

## 3. Point sign-in at your site

Under **Authentication → URL Configuration**:

- **Site URL**: your Vercel address, e.g. `https://il-salotto-app.vercel.app`
- **Redirect URLs**: add both
  - `https://il-salotto-app.vercel.app/**`
  - `http://localhost:5173/**`

Email sign-in is on by default, and magic links need no other setup.

## 4. Give the app its keys

Under **Project Settings → API**, copy two things: the **Project URL** and the **anon public** key.
The anon key is safe in a browser; it's designed to be public, and the row level security policies
are what protect the data. Never put the `service_role` key in this app.

**On Vercel:** Project → Settings → Environment Variables, add both for all environments:

| Name | Value |
| --- | --- |
| `VITE_SUPABASE_URL` | the Project URL |
| `VITE_SUPABASE_ANON_KEY` | the anon public key |

Then Deployments → Redeploy. Environment variables are read at build time, so a redeploy is
required; a page refresh won't do it.

**On your Mac:** copy `.env.example` to `.env.local` and paste the same two values in. That file is
git-ignored, so it never reaches GitHub.

## 5. Try it

Open the app, go to the login screen, type your email, tap **Send my link**. The email arrives in a
minute; opening it signs you in on that device and keeps you signed in. Leave a note, then reload:
it should still be there. Open it on your phone and the same note should appear.

## Things worth knowing

- **Email limits.** Supabase's built-in email sender is capped at a few messages an hour, which is
  fine for you and a couple of testers and not fine for a real membership. When you're ready, add a
  proper sender under Authentication → SMTP Settings. [Resend](https://resend.com) has a free tier
  and takes about ten minutes to connect.
- **Names.** A new member's display name defaults to the part of their email before the `@`, and the
  little line beside it ("Torino", "moving in May") is empty until they set it. A short profile
  screen is the natural next piece of work.
- **The sample room stays visible** until real notes exist, so the screens never look broken to a
  first member. Once people write, their notes appear above the samples. Say the word when you'd
  like the samples removed.
- **Your data is yours.** Everything lives in your Supabase project. Table Editor lets you read,
  edit, or delete anything, and Database → Backups keeps daily copies.
