import {
    TOGGLE_HABIT_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION
    UPDATE_PROGRESS_AMOUNT,
    INCREMEMNT_PROGRESS_AMOUNT
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
        case TOGGLE_SUBTASK_COMPLETION: {
            let {date, name, subtaskName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][name] = {...state[date][name]}
            newState[date][name].habitInfo = {...state[date][name].habitInfo}
            newState[date][name].habitInfo.subtasks = {...state[date][name].habitInfo.subtasks}
            newState[date][name].habitInfo.subtasks[subtaskName] = !state[date][name].habitInfo.subtasks[subtaskName]
        }
        case UPDATE_PROGRESS_AMOUNT: {
            let {date, habitName, amount} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].amount = amount
            return newState
        }
        case INCREMEMNT_PROGRESS_AMOUNT: {
            let {date, habitName, amount} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].amount = state[date][habitName].amount + amount
            return newState
        }
    }
    return state
}

export default historyReducer;
