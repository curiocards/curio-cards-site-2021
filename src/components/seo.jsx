import * as React from "react"

const siteDescription = "Curio Cards is an online art show and permanent gallery that launched on May 9, 2017."
const siteImage = "https://curio.cards/icons/icon-512x512.png"

const Seo = ({ title = "Curio Cards", description = siteDescription, image = siteImage, canonical = "https://curio.cards", twitterCard = "summary" }) => (
  <>
    <html lang="en" />
    <title>{title}</title>
    <link rel="canonical" href={canonical} />
    <meta charSet="utf-8" />
    <meta name="theme-color" content="#F57040" />
    <meta name="description" content={description} />

    <meta property="og:title" content={title} />
    <meta property="og:image" content={image} />
    <meta property="og:url" content={canonical} />
    <meta property="og:description" content={description} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content={twitterCard} />
    <meta name="twitter:site" content="MyCurioCards" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
  </>
)

export default Seo
