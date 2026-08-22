import * as React from "react"
import { graphql } from "gatsby"

import Seo from "../../components/seo"
import { cardImages } from "../../components/constants.jsx"
import MainView  from "../../views/main-view"

const CardPage = (props) => {
  const { allCards, allArtists } = props.data;

  // pull out state from props.location, so we set filters appropriately on forward/back browser navigation
  const artistFilter = props.location.state ? props.location.state.artistFilter : null;
  const sort = props.location.state ? props.location.state.sort : null;

  return <MainView allCards={allCards} allArtists={allArtists} selectedCardNumber={props.pageContext.number} artistFilter={artistFilter} sort={sort} location={props.location} />
}

export default CardPage

export const Head = ({ data, pageContext }) => {
  const card = data.allCards.nodes.find(c => c.number === Number(pageContext.number))
  if (!card) return <Seo />
  return <Seo
    title={`Curio Cards – ${card.title}`}
    description={card.description}
    image={"https://curio.cards" + cardImages[card.number]}
    canonical={`https://curio.cards/card/${card.number}`}
  />
}

export const query = graphql`
  query {
    allCards: allCardsJson {
      nodes {
        title
        number
        supply
        artist
        description
        ipfs_metadata
        ipfs_image
      }
    }
    allArtists: allArtistsJson {
      nodes {
        biography
        id
        name
        slug
        twitter
        website
      }
    }
  }
`
