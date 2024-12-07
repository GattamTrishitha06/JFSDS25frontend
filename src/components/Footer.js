import React from "react";
import facebookIcon from "../assets/facebook-icon.png";
import twitterIcon from "../assets/twitter-icon.png";
import linkedinIcon from "../assets/linkedin-icon.png";
import instagramIcon from "../assets/instagram-icon.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Logo and Social Media Section */}
        <div className="footer-logo">
          <h2>DonationSphere</h2>
          <div className="social-media">
            <a href="#">
              <img src={facebookIcon} alt="Facebook" />
            </a>
            <a href="#">
              <img src={twitterIcon} alt="Twitter" />
            </a>
            <a href="#">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
            <a href="#">
              <img src={instagramIcon} alt="Instagram" />
            </a>
          </div>
          <p className="followers">
            2.5M+ <br /> Followers
          </p>
          <p className="contact-info">
            For any queries
            <br />
            Email: info@donationsphere.org
            <br />
            Contact No: +91 9930088522
          </p>
        </div>

        {/* Links Sections */}
        <div className="footer-links">
          <div className="footer-column">
            <h3>Causes</h3>
            <ul>
              <li><a href="#">Medical crowdfunding</a></li>
              <li><a href="#">Cancer Crowdfunding</a></li>
              <li><a href="#">Transplant Crowdfunding</a></li>
              <li><a href="#">Education Crowdfunding</a></li>
              <li><a href="#">Sports Crowdfunding</a></li>
              <li><a href="#">Child Welfare</a></li>
              <li><a href="#">Animal Fundraisers</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>How it works?</h3>
            <ul>
              <li><a href="#">Fundraising for NGOs</a></li>
              <li><a href="#">Sponsor A Child</a></li>
              <li><a href="#">Fundraising Tips</a></li>
              <li><a href="#">What is Crowdfunding?</a></li>
              <li><a href="#">Corporates</a></li>
              <li><a href="#">Withdraw Funds</a></li>
              <li><a href="#">Browse Fundraiser</a></li>
              <li><a href="#">Find Hospitals</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>About Us</h3>
            <ul>
              <li><a href="#">Team DonationSphere</a></li>
              <li><a href="#">In The News</a></li>
              <li><a href="#">Web Stories</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">DonationSphere Blog</a></li>
              <li><a href="#">Success Stories</a></li>
              <li><a href="#">Is DonationSphere Genuine?</a></li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Support</h3>
            <ul>
              <li><a href="#">Medical Finance</a></li>
              <li><a href="#">FAQs & Help Center</a></li>
              <li><a href="#">Are DonationSphere Campaigns Genuine?</a></li>
              <li><a href="#">Fundraiser Video</a></li>
              <li><a href="#">Trust & Safety</a></li>
              <li><a href="#">Plans & Pricing*</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Text */}
      <div className="footer-bottom">
        <p>
          Copyright © 2024 DonationSphere Online Ventures Pvt Ltd. All Rights Reserved. Terms of Use | Privacy Policy | AML Policy | Use of cookies
        </p>
        <p>
          DonationSphere is a private limited company operating an online intermediary platform providing crowdfunding services for medical, social, and charitable causes. We facilitate transactions between contributors and campaigners. Ketto does not provide any financial benefits in any form whatsoever to any person making contributions on its platform.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
