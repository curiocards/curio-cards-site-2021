import * as React from "react";

const pageStyles = {
  color: "#232129",
  padding: "96px",
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  border: "none",
  width: "100vw",
  maxWidth: "960px",
  margin: "auto",
};

const h2Styles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  marginTop: 16,
  marginBottom: 16,
  fontSize: 24,
  marginLeft: 0,
  marginRight: "auto",
};

const h3Styles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  marginTop: 16,
  marginBottom: 16,
  fontSize: 20,
  marginLeft: 0,
  marginRight: "auto",
};

const paragraphStyles = {
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
  marginBottom: 8,
  marginLeft: 0,
  marginRight: "auto",
};

const PrivacyPage = () => {
  return (
    <main style={pageStyles}>
      <title>Privacy Policy</title>
      <h1 id="curio-cards-privacy-policy">Curio Cards Privacy Policy</h1>
      <p style={paragraphStyles}>Last Updated: September 6, 2023</p>

      <h2 style={h2Styles} id="introduction">Introduction</h2>
      <p style={paragraphStyles}>
        Curio Cards is committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and share information when you visit our website to view or purchase Curio Cards products, or to explore the Curio Cards collection—the first art show on the Ethereum blockchain. These digital collectibles are available for purchase on OpenSea as non-fungible tokens (NFTs).
      </p>

      <h2 style={h2Styles} id="types-of-information-we-collect">Types of Information We Collect</h2>
      <h3 style={h3Styles} id="information-you-provide-us">Information You Provide Us</h3>
      <p style={paragraphStyles}>Feedback: When you contact us, your name, contact details, and the content of your messages are collected.</p>

      <h3 style={h3Styles} id="information-collected-automatically">Information Collected Automatically</h3>
      <p style={paragraphStyles}>Interactions: Browser type, IP address, device ID, and actions on our website.</p>

      <h3 style={h3Styles} id="public-activity-information">Public Activity Information</h3>
      <p style={paragraphStyles}>We collect data from activity and information that is publicly visible and/or accessible on blockchains or other public sources. This may include blockchain wallet addresses and transactions related to Curio Cards digital collectibles.</p>
      
      <h2 style={h2Styles} id="use-of-your-information">Use of Your Information</h2>
      <h3 style={h3Styles} id="we-use-your-information-to">We Use Your Information To</h3>
      <p style={paragraphStyles}>Operate and maintain the website</p>
      <p style={paragraphStyles}>Improve and analyze our digital collectibles</p>
      <p style={paragraphStyles}>Personalize your viewing experience</p>
      <p style={paragraphStyles}>Communicate with you</p>
      <p style={paragraphStyles}>Investigate and prevent harmful or unlawful conduct</p>
      <p style={paragraphStyles}>Send newsletters, promotional materials, and other notices</p>
      <p style={paragraphStyles}>We may create anonymized records from identifiable information and reserve the right to use and disclose anonymized information for any purpose.</p>

      <h2 style={h2Styles} id="sharing-of-your-information">Sharing of Your Information</h2>
      <h3 style={h3Styles} id="third-party-service-providers">Third-Party Service Providers</h3>
      <p style={paragraphStyles}>We use Google Analytics specifically for email marketing.</p>

      <h3 style={h3Styles} id="affiliates">Affiliates</h3>
      <p style={paragraphStyles}>Information may be shared with subsidiaries, joint ventures, or other entities under common control, required to honor this policy.</p>

      <h3 style={h3Styles} id="corporate-restructuring">Corporate Restructuring</h3>
      <p style={paragraphStyles}>Information may be shared in mergers, acquisitions, or asset sales.</p>

      <h3 style={h3Styles} id="legal-rights">Legal Rights</h3>
      <p style={paragraphStyles}>In legal scenarios, your information may be disclosed irrespective of any choices you make.</p>

      <h2 style={h2Styles} id="your-choices-regarding-information">Your Choices Regarding Information</h2>
      <p style={paragraphStyles}>Email: You can opt out of promotional emails.</p>
      <p style={paragraphStyles}>Cookies: You can change browser settings to stop accepting cookies.</p>

      <h3 style={h3Styles} id="data-retention-security-and-minors">Data Retention, Security, and Minors</h3>
      <p style={paragraphStyles}>We may retain your information even after deletion requests, if required by law or to protect our rights.</p>
      <p style={paragraphStyles}>We implement safeguards, but cannot guarantee total security.</p>
      <p style={paragraphStyles}>The Service is not for users under 13.</p>

      <h2 style={h2Styles} id="international-users-and-legal-rights">International Users and Legal Rights</h2>
      <p style={paragraphStyles}>Data may be processed in countries with different privacy laws.</p>
      <p style={paragraphStyles}>EEA, UK, and Swiss users have specific rights, as do California residents under the CPRA.</p>

      <h2 style={h2Styles} id="changes-to-this-policy">Changes to This Policy</h2>
      <p style={paragraphStyles}>This policy may be updated; changes will be posted on our website.</p>

      <h2 style={h2Styles} id="contact-us">Contact Us</h2>
      <p style={paragraphStyles}>For questions about this Privacy Policy, please contact us at outreach@curio.cards.</p>
    </main>
  );
};

export default PrivacyPage;
