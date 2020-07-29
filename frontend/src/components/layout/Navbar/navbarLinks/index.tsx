import { Button, ButtonGroup } from '@chakra-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from '../../../../hooks';
import { NavLink } from '../../../../interfaces/NavInterfaces';

const RouteButton = ({ name, link }: NavLink) => <Link to={link}>{name}</Link>;

const NavbarLinks = () => {
  const navLinks = useStoreState((state) => state.navLinks);
  const toggleActiveRoute = useStoreActions((actions) => actions.navLinks.toggleActive);
  return (
    <ButtonGroup spacing={3}>
      {navLinks.routes.map((i: NavLink) => (
        <Button
          key={i.name}
          color={i.active ? 'white' : 'gray'}
          variantColor="teal"
          variant={i.active ? 'solid' : 'ghost'}
          onClick={() => toggleActiveRoute(i)}
        >
          <RouteButton id={i.id} name={i.name} link={i.link} active />
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default NavbarLinks;
