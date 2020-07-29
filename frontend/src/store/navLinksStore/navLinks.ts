import { action } from 'easy-peasy';
import { NavLinksModel } from '../../interfaces/NavInterfaces';

const NavLinks: NavLinksModel = {
  routes: [
    {
      id: 0,
      name: 'Home',
      link: '/',
      active: true,
    },
    {
      id: 1,
      name: 'Recipes',
      link: '/recipes',
      active: false,
    },
    {
      id: 2,
      name: 'About',
      link: '/about',
      active: false,
    },
  ],
  activeRoute: 0,
  toggleActive: action((state, entry) => {
    if (state.activeRoute === entry.id) return;
    state.routes[state.activeRoute].active = !state.routes[state.activeRoute].active;
    state.activeRoute = entry.id;
    state.routes[state.activeRoute].active = !entry.active;
  }),
};

export default NavLinks;
