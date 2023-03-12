# Curio Cards Website

**Website: https://curio.cards**

Curio Cards is the First Art Show NFT on Ethereum, launched as an online gallery art show on May 9, 2017.<br />
Read more about the project at [docs.curio.cards](https://docs.curio.cards).

## How it works

When searching for an ethereum account, the website will make a request to the [Curio Cards Subgraph](https://thegraph.com/explorer/subgraphs/9evrJv2eigNjcpH66eyufiwVZaMpdbiqBhf1nPphHZsG?view=Overview&chain=mainnet). The subgraph will return ownership information for both the original erc20 as well as the wrapped erc1155 Curio Cards. Check out [src/services/graph.js](/src/services/graph.js) to see how this request is made.

## Developing

This site is built with Gatsby JS. Install gatsby, then run 'gatsby develop'.
