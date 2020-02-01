import React from "react";
// import { useQuery, useMutation } from "../../lib/api";
import { useQuery, useMutation } from "react-apollo";
// import {
//   DeleteListingData,
//   DeleteListingVariables,
//   // Listing,
//   ListingsData
// } from "./types";
import gql from "graphql-tag";
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";

const LISTINGS = gql`
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

const DELETE_LISTING = gql`
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
  const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS); // custom

  const [
    deleteListing,
    { loading: deleteListingLoading, error: deleteListingError }
  ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING);

  const handleDeleteListing = async (id: string) => {
    await deleteListing({ variables: { id } });
    // await server.fetch<DeleteListingData, DeleteListingVariables>({
    //   query: DELETE_LISTING,
    //   variables: {
    //     id
    //   }
    // });

    // fetchListings();   // custom
    refetch(); // refetch
  };

  const listings = data ? data.listings : null; // custom

  const listingsList = listings ? (
    <ul>
      {listings.map(listing => {
        return (
          <li key={listing.id}>
            {listing.title} {listing.address}{" "}
            <button onClick={() => handleDeleteListing(listing.id)}>
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;
  if (loading) {
    return <h2>Loading...</h2>;
  }
  if (error) {
    return <h2 style={{ color: "red" }}>Some error happend</h2>;
  }
  const deleteListingLoadingMessage = deleteListingLoading ? (
    <h2>Deletion in progress...</h2>
  ) : null;

  const deleteListingErrorMessage = deleteListingError ? (
    <h2>Something went wrong...</h2>
  ) : null;

  return (
    <div>
      <h2>{title}</h2>
      {listingsList}
      {deleteListingLoadingMessage}
      {deleteListingErrorMessage}
      {/* <button onClick={fetchListings}>Query Listings!</button> */}
    </div>
  );
};
