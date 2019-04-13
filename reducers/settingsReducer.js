import {
    ADD_HABIT_TO_SETTINGS, 
    RESTORE_SETTINGS_FROM_FIREBASE, 
    DELETE_HABIT_FROM_SETTINGS
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
        case RESTORE_SETTINGS_FROM_FIREBASE: {
            let { settings } = action
            return settings
        }
        case DELETE_HABIT_FROM_SETTINGS: {
            let { habitName } = action
            let newState = {...state}
            newState.habitSettings = {...state.habitSettings}
            delete newState.habitSettings[habitName]
            return newState
        }
    }
    return state
}

export default settingsReducer;