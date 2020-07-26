import { Flex, Image } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/core/logo.png';

const Logo = () => {
  return (
    <Flex align="center" mr={5}>
      <Link to="/">
        <Image src={logo} />
      </Link>
    </Flex>
  );
};

export default Logo;
