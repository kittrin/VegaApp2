import {combineReducers, createStore} from "redux";
import {reducer} from "./reducerType";
import {specialtyReducer} from "./specialityReducer";
import {subjectReducer} from "./subjectReducer";
import {tutorReducer} from "./tutorReducer";

const rootReducer = combineReducers({
    specialtyReducer: specialtyReducer,
    subjectReducer: subjectReducer,
    tutorReducer: tutorReducer
})
export const store = createStore(rootReducer)
