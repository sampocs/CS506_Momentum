import {
    ADD_HABIT_TO_SETTINGS
} from '../actions/actions'

const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_HABIT_TO_SETTINGS: {
            let {habitName, habitSettings} = action
            let newState = {...state}
            newState.habitSettings = {...state.habitSettings}
            newState.habitSettings[habitName] = habitSettings
            return newState
        }
    }
    return state
}

export default settingsReducer;