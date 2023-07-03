import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';


const reducers = {
  login: LoginReducer,
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
