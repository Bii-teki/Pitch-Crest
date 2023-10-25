import React from "react";

function Footer() {
  return (
    <div className="footer bg-gray-300 text-center p-4 shadow-lg mt-4 pb-4"> {/* Add 'pb-4' class for padding-bottom */}
      <h1 className="text-xl font-bold">Pitch Crest</h1>
      <h4 className="text-gray-600">Find us on</h4>
      <div className="socials flex justify-center space-x-4">
        <a href="facebook.com"><img src="facebook.png" alt="Facebook" className="followus w-8 h-8" /></a>
        <a href="instagram.com"><img src="instagram.png" alt="Instagram" className="followus w-8 h-8" /></a>
        <a href="linkedin.com"><img src="linkedin.png" alt="LinkedIn" className="followus w-8 h-8" /></a>
        <a href="twitter.com"><img src="twitter.png" alt="Twitter" className="followus w-8 h-8" /></a>
      </div>
      <p className="text-gray-600">All rights reserved.</p>
    </div>
  );
}

export default Footer;