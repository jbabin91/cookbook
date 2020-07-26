import { Flex } from '@chakra-ui/core';
import React from 'react';
import Navbar from './Navbar';

const Header: React.FC = () => (
  <Flex as="nav" align="center" wrap="wrap" padding="1.5rem" bg="white">
    <Navbar />
  </Flex>
);

export default Header;
