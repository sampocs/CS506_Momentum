import dummyData from "../assets/data/dummyData";
import calendarReducer from "./calendarReducer";
import settingsReducer from './settingsReducer';
import historyReducer from './historyReducer';
import {
    CLEAR_USER_DATA
} from '../actions/actions'
import initialData from "../assets/data/initialData";
import testingDataWeekMonth from "../assets/data/testingDataWeekMonth";

const initialState = testingDataWeekMonth

function mainReducer(state = initialState, action) {
    if (action.type === CLEAR_USER_DATA) {
        //storage.removeItem('persist:root')  //uncomment when using persist
        state = initialState
    }
    return {
        calendarState: calendarReducer(state.calendarState, action),
        history: historyReducer(state.history, action),
        settings: settingsReducer(state.settings, action)
    }
}

export default mainReducer;