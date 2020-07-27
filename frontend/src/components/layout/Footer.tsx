import React from 'react';
import {
  FaBehance,
  FaDribbble,
  FaFacebook,
  FaLinkedin,
  FaPinterest,
  FaTwitter,
} from 'react-icons/fa';
import { Logo } from '../shared';

const SocialMedia = () => (
  <div>
    <a href="/">
      <FaPinterest />
    </a>
    <a href="/">
      <FaFacebook />
    </a>
    <a href="/">
      <FaTwitter />
    </a>
    <a href="/">
      <FaDribbble />
    </a>
    <a href="/">
      <FaBehance />
    </a>
    <a href="/">
      <FaLinkedin />
    </a>
  </div>
);

const Footer = () => {
  return (
    <div>
      <SocialMedia />
      <Logo />
    </div>
  );
};

export default Footer;
