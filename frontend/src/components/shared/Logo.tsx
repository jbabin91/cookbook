import React from 'react';
import { Flex, Image } from '@chakra-ui/core';
import logo from '../../assets/images/core/logo.png';

const Logo = () => {
  return (
    <Flex align="center" mr={5}>
      <Image src={logo} />
    </Flex>
  );
};

export default Logo;
