import dummyData from "../assets/data/dummyData";
import calendarReducer from "./calendarReducer";
import settingsReducer from './settingsReducer';
import historyReducer from './historyReducer';

const initialState = dummyData

function mainReducer(state = initialState, action) {
    return {
        calendarState: calendarReducer(state.calendarState, action),
        history: historyReducer(state.history, action),
        settings: settingsReducer(state.settings, action)
    }
}

export default mainReducer;