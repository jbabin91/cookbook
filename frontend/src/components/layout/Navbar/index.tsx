import { Flex } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../shared/Logo';

// interface Route {
//   name: string;
//   link: string;
//   active: boolean;
// }

// const RouteButton = ({ name, link, active }: Route) => (
//   <Button
//     color={active ? 'white' : 'gray'}
//     variantColor="teal"
//     variant={active ? 'solid' : 'ghost'}
//   >
//     <Link to={link}>{name}</Link>
//   </Button>
// );

const Navbar = () => (
  <Flex>
    <Flex pr="10rem">
      <Logo />
    </Flex>
    <Link to="/">Home</Link>
    <Link to="/recipes">Recipes</Link>
    <Link to="/about">About</Link>
  </Flex>
);

export default Navbar;
