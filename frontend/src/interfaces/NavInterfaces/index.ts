import { Action } from 'easy-peasy';

export interface NavLink {
  id: number;
  name: string;
  link: string;
  active: boolean;
}

export interface NavLinksModel {
  routes: NavLink[];
  activeRoute: number;
  toggleActive: Action<NavLinksModel, NavLink>;
}
