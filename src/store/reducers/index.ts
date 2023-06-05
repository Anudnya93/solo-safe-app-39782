import { combineReducers } from 'redux';

import LoginReducer from './loginReducer';


const reducers = {
  loginReducer: LoginReducer,
};

export const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;
