import React from "react";
import { server, useQuery } from "../../lib/api";
import {
  DeleteListingData,
  DeleteListingVariables,
  // Listing,
  ListingsData
} from "./types";

const LISTINGS = `
  query Listings {
    listings {
      id
      title
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`;

const DELETE_LISTING = `
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`;

interface Props {
  title: string;
}

export const Listings = ({ title }: Props) => {
  const { data, refetch } = useQuery<ListingsData>(LISTINGS); // custom

  //--------------CUSTOM-----------
  // const [listings, setListings] = useState<Listing[] | null>(null);

  // useEffect(() => {
  //   // preferable to use server.fetch here
  //   // all functions using a hook to move to useEffect
  //   // (because of function dependencies)
  //   // however we need it for deleteListing

  //   fetchListings();
  //   if (listings && listings.length) {
  //     console.log("listings exists", listings);
  //   }
  // }, []);

  // const fetchListings = async () => {
  //   const { data } = await server.fetch<ListingsData>({ query: LISTINGS });
  //   setListings(data.listings);
  // };
  //--------------CUSTOM-----------

  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: {
        id
      }
    });
    // fetchListings();   // custom
    refetch(); // refetch
  };

  const listings = data ? data.listings : null; // custom

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title}{" "}
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {/* <button onClick={fetchListings}>Query Listings!</button> */}
    </div>
  );
};
