import AsyncStorage from '@react-native-async-storage/async-storage'
import { applyMiddleware, compose, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'
import asyncActionCreator from './middlewares/asyncActionCreator'
import { rootReducer } from './reducers'

const logger = createLogger({
  collapsed: true
})

const persistConfig = {
  key: 'root:solo',
  storage: AsyncStorage,
  whitelist: ['loginReducer']
}

const emptyMiddleWare = () => next => action => next(action)

let loggerMiddleWare = emptyMiddleWare

if (__DEV__) {
  loggerMiddleWare = logger
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = createStore(
  persistedReducer,
  compose(applyMiddleware(asyncActionCreator, thunk, loggerMiddleWare))
)
const persistor = persistStore(store)

export { store, persistor }
