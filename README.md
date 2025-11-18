## Summary

An application that will allow a group of people (either in person or remote) to submit items for tasting and rank them against each other.

### Event Flow

- Event is created by a single person (Host)
- On creation event is given a unique id/password to be shared with other users (Guests)
- Simple registration for Guests, event id/password and name entry
- Events limited to 250 items (most should be 10-50)
- No limit to event, can be long lasting (Fresh Hop Season ~18 weeks)
- Events have a few distinct options:
  - ItemType: Beer | Wine | Whiskey
  - EventType: Blind | Open
- Collabarative, any user can add an item

### Mobile First Experience

- Users use their phone to:
  - add new items to event
  - edit items (locked to submitting user or open?)
  - rate items, add tasting notes
- Easy to use one handed, large touch targets

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
