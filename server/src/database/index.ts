import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

// const url = `mongodb+srv://${process.env.DB_USER}:${
//   process.env.DB_USER_PASSWORD
// }@${process.env.DB_CLUSTER}.mongodb.net`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(
    // mongodb://<dbuser>:<dbpassword>@ds215219.mlab.com:15219/test_listings
    // INSERT DB URL

    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  );
  const db = client.db("test_listings");

  return {
    listings: db.collection("test_listings")
  };
};
