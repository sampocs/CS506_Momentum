import {
    TOGGLE_HABIT_COMPLETION
} from '../actions/actions'

const historyReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_HABIT_COMPLETION: {
            let {date, habitName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].completed = !state[date][habitName].completed
            return newState
        }
    }
    return state
}

export default historyReducer;