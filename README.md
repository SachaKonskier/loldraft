LOLDRAFT

## Getting Started
First install the dependencies

```bash
npm install
````

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

And go to the /homepage because the / is not working atm


## TODO

### USE CASE FRONT
- [ ] Search component in navbar for one account/summoner
### USE CASE BACKEND
- [X] Retrieve the Puuid for a user input (entry point for the RIOT API)
- [X] Retrieve the matches ID for a player
- [X] Retrieve the match details for a matchId and return a raw but specific data model value
- [ ] For every match, custom the fetched data according to the expected data model in the front page
- [ ] Custom the GetMatchList method and add parameters for the index and the number of items in a page

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
