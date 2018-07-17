import { applyMiddleware, createStore, compose } from 'redux'
import logger from 'redux-logger'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native



const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, RootReducer)

//const store = createStore(
//    persistedReducer,
//    compose(
//        applyMiddleware(ReduxThunk,logger)
//    )
//);
//persistStore(store);
//export default store;
//export default () => {
    let store = createStore(
        persistedReducer,
        compose(
            applyMiddleware(ReduxThunk, logger)
        )
    );
    let persistor = persistStore(store)
//    return { store, persistor }
//}
export default store;
export {persistor};