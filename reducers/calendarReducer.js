import {
    TOGGLE_MINIMIZE_CAL,
} from '../actions/actions'

const calendarReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_MINIMIZE_CAL: {
            return {
                ...state,
                minimized: !state.minimized
            }
        }
    }
    return state
}

export default calendarReducer;

