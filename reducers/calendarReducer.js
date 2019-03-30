import {
    TOGGLE_MINIMIZE_CAL,
    SELECT_DATE,
    SELECT_TODAY
} from '../actions/actions'

const calendarReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_MINIMIZE_CAL: {
            return {
                ...state,
                minimized: !state.minimized
            }
        }
        case SELECT_TODAY: {
            return {
                ...state,
                currentSelectedDate: action.date
            }
        }
        case SELECT_DATE: {
            return {
                ...state,
                currentSelectedDate: action.date
            }
        }
    }
    return state
}

export default calendarReducer;

