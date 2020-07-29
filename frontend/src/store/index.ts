import { createStore } from 'easy-peasy';
import Store from '../interfaces/Store';
import NavLinks from './navLinksStore/navLinks';

const store: Store = {
  navLinks: NavLinks,
};

export default createStore<Store>(store);
