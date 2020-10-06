import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk  from "redux-thunk";

import primaryReducer from "./reducers/primary_reducer";

const saveToSessionStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem("online_Shopping_site_state", serializedState);
    } catch (error) {
        console.log(error);
    }
}

const loadFromSessionStorage = () => {
    try {
        let serializedState = sessionStorage.getItem("online_Shopping_site_state");
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (error) {
        console.log(error);
        return undefined;
    }
}

const persistedState = loadFromSessionStorage();

const rootReducer = combineReducers({
    state01: primaryReducer
})

const store = createStore(rootReducer, persistedState, applyMiddleware(thunk));

store.subscribe(()=>{
    return saveToSessionStorage(store.getState());
});

export default store;