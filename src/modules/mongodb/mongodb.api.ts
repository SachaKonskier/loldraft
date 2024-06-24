import { MongoDbService } from "./mongodb.service";
import clientPromise from "@/lib/mongodb";

export const MongoApi: MongoDbService = {
    getUserFromDb: async (username)  => {
            try {
               const response = await fetch(`api/user?username=${username}`).then((response) => response.json());
               return response
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },
    insertUserToDb: async (user) => {
        console.log('in method', user)
        try {
            const response = await fetch(`api/user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            }).then((response) => response.json());
            return response;
            
        }
        catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
        // return clientPromise.then((client) => {
        //     const db = client.db("smart_draft");
        //     const collection = db.collection("users");
        //     return collection.insertOne(user);
        // }
        // );
    },
    // getChampionFromDb: async (championId) => {
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("champions");
    //         return collection.findOne({ championId });
    //     }
    //     );
    // },
    // insertChampionToDb: async (champion) => {
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("champions");
    //         return collection.insertOne(champion);
    //     }
    //     );
    // },
    // getMatchFromDb: async (matchId) => {
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("matchs");
    //         return collection.findOne({ matchId });
    //     }
    //     );
    // },
    // insertMatchToDb: async (match) => {
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("matchs");
    //         return collection.insertOne(match);
    //     }
    //     );
    // },
    // getSummonerFromDb: async (summonerName) => {
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("summoners");
    //         return collection.findOne({ summonerName });
    //     }
    //     );
    // },
    // insertSummonerToDb: async (summoner) =>{
    //     return clientPromise.then((client) => {
    //         const db = client.db("smart_draft");
    //         const collection = db.collection("summoners");
    //         return collection.insertOne(summoner);
    //     }
    //     );
    // },
};