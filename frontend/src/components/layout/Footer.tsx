import { Flex } from '@chakra-ui/core';
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
  <Flex align="center" justify="space-between" wrap="wrap" padding="1.5rem" color="white">
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
  </Flex>
);

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="black"
      color="white"
      height="140px"
    >
      <SocialMedia />
      <Logo />
    </Flex>
  );
};

export default Footer;
