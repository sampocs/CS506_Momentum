import {
    ADD_HABIT_TO_SETTINGS, 
    RESTORE_SETTINGS_FROM_FIREBASE, 
    DELETE_HABIT_FROM_HABIT_SETTINGS,
    CHANGE_HABIT_ORDER,
    DELETE_HABIT_FROM_HABIT_ORDER
} from '../actions/actions'

const settingsReducer = (state = {}, action) => {
    switch (action.type) {
        case ADD_HABIT_TO_SETTINGS: {
            let {habitName, habitSettings} = action
            let newState = {...state}
            newState.habitSettings = {...state.habitSettings}
            newState.habitSettings[habitName] = habitSettings
            newState.habitOrder = [...state.habitOrder, habitName]
            return newState
        }
        case RESTORE_SETTINGS_FROM_FIREBASE: {
            let { settings } = action
            return settings
        }
        case DELETE_HABIT_FROM_HABIT_SETTINGS: {
            let { habitName } = action
            let newState = {...state}
            newState.habitSettings = {...state.habitSettings}
            delete newState.habitSettings[habitName]
            return newState
        }
        case DELETE_HABIT_FROM_HABIT_ORDER: {
            let { habitName } = action
            let newState = {...state}
            newState.habitOrder = state.habitOrder.filter((habit) => habit != habitName)
            return newState
        }
        case CHANGE_HABIT_ORDER: {
            let { prevOrder, nextOrder } = action
            let newState = {...state}
            let habitIndexes = {}
            for (i in prevOrder) {
                let currIndex = prevOrder[i]
                let habit = state.habitOrder[parseInt(currIndex)]
                habitIndexes[currIndex] = habit
            }
            newState.habitOrder = nextOrder.map((index) => habitIndexes[index])
            return newState
        }
    }
    return state
}

export default settingsReducer;