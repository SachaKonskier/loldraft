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
- [ ] Display the n matches (1 or 20 last matches for now) on the page (check figma) 
### USE CASE BACKEND
- [X] Retrieve the Puuid for a user input (entry point for the RIOT API)
- [X] Retrieve the matches ID for a player
- [X] Retrieve the match details for a matchId and return a raw but specific data model value
- [ ] For every match, custom the fetched data according to the expected data model in the front page
- [ ] Create the data model for the return value from the riot MATCH ID API
- [ ] Create the data model that will be displayed in the front
- [ ] Aggregate the data for all matches to fit the data model
- [ ] Custom the GetMatchList method and add parameters for the index and the number of items in a page
- [ ] For every object in our Filtered Matches, we want two new field => champion icon (for the champion icon in the card) and champion image (for the backgound of the card in the front)
- [ ] A Sync method that call https://ddragon.leagueoflegends.com/ to retrieve in a json all the current champions
- [ ] Aggregate the data between the filteredData and the Sync method to add the champion name and a champion url image

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
