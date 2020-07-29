import { createTypedHooks } from 'easy-peasy';
import Store from '../interfaces/Store';

const typedHooks = createTypedHooks<Store>();

export const { useStoreActions } = typedHooks;
export const { useStoreDispatch } = typedHooks;
export const { useStoreState } = typedHooks;
