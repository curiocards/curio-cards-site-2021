import * as React from "react"
import { graphql, navigate } from "gatsby"

import MainView from "../views/main-view"

const IndexPage = (props) => {
  const { allCards, allArtists } = props.data;

  // if the URL contained ?address=0x12341234, pull that out and navigate to /address page instead.
  const queryString = new URLSearchParams(props.location.search);
  const addressQuery = queryString.get("address");
  if (addressQuery) {
    navigate(`/address/${addressQuery}`, { replace: true });
  }

  // pull out state from props.location, so we set filters appropriately on forward/back browser navigation
  const artistFilter = props.location.state ? props.location.state.artistFilter : null;
  const sort = props.location.state ? props.location.state.sort : null;

  return <MainView allCards={allCards} allArtists={allArtists} artistFilter={artistFilter} sort={sort} />
}

export default IndexPage

export const query = graphql`
  query {
    allCards: allCardsJson {
      nodes {
        title
        number
        supply
        artist
        description
        buyLink
      }
    }
    allArtists: allArtistsJson {
      nodes {
        biography
        id
        name
        twitter
        website
      }
    }
  }
`
