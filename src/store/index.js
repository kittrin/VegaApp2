import {createStore} from "redux";
import {reducer} from "./reducerType";

export const store = createStore(reducer)
