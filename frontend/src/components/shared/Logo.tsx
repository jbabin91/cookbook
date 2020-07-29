import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/core/logo.png';
import { useStoreActions, useStoreState } from '../../hooks';

const Logo = () => {
  const navLinks = useStoreState((state) => state.navLinks.routes);
  const toggleActiveRoute = useStoreActions((actions) => actions.navLinks.toggleActive);
  return (
    <Link to="/" onClick={() => toggleActiveRoute(navLinks[0])}>
      <img src={logo} alt="logo" />
    </Link>
  );
};

export default Logo;
