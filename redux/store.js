import user from "./slices/user";
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

const combinedReducers = combineReducers({user});

const masterReducer = (state, action) => {
  if (action.type === HYDRATE) return {
    ...state,
    ...action.payload
  }; else return combinedReducers(state, action);
}

export const makeStore = () => configureStore({ reducer: masterReducer, devTools: true });

export const wrapper = createWrapper(makeStore, { debug: false });