import { Flex } from '@chakra-ui/core';
import React from 'react';
import Logo from '../../shared/Logo';
import NavbarLinks from './navbarLinks';

const Navbar = () => (
  <>
    <Flex align="center" mr={5}>
      <Logo />
    </Flex>
    <NavbarLinks />
  </>
);

export default Navbar;
