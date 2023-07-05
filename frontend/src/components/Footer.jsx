import React, { memo } from "react";

const Footer = memo(({ loggedIn }) => (
  <footer className="footer">
    {loggedIn && <p className="footer__copyright">
      &#169; {new Date().getFullYear()} Mesto Russia
    </p>}
  </footer>
));

export default Footer;