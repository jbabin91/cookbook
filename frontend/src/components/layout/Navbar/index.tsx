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
  <div>
    <div>
      <Logo />
    </div>
    <div>
      <Link to="/">Home</Link>
      <Link to="/recipes">Recipes</Link>
      <Link to="/about">About</Link>
    </div>
  </div>
);

export default Navbar;
