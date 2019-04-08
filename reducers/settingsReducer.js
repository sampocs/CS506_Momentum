import {
    ADD_HABIT_TO_SETTINGS, UPDATE_EMAIL, UPDATE_FIREBASE_USER
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
        case UPDATE_EMAIL: {
            let {email} = action
            let newState = {...state}
            newState.user = {...state.user}
            newState.user.email = email
            return newState
        }
        case UPDATE_FIREBASE_USER: {
            let {firebaseUser} = action
            let newState = {...state}
            newState.user = {...state.user}
            newState.user.firebaseUser = firebaseUser
            return newState
        }
    }
    return state
}

export default settingsReducer;