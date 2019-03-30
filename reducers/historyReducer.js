import {
    TOGGLE_COMPLETE_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_NEXT_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    UPDATE_PROGRESS_AMOUNT,
    INCREMEMNT_PROGRESS_AMOUNT
} from '../actions/actions'


const historyReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_COMPLETE_COMPLETION: {
            let {date, habitName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].completed = !state[date][habitName].completed
            return newState
        }
        case TOGGLE_SUBTASK_COMPLETION: {
            let {date, habitName, index} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].habitInfo = {...state[date][habitName].habitInfo}
            newState[date][habitName].habitInfo.subtasks = [...state[date][habitName].habitInfo.subtasks]
            newState[date][habitName].habitInfo.subtasks[index][1] = !state[date][habitName].habitInfo.subtasks[index][1]
            return newState
        }
        case TOGGLE_NEXT_SUBTASK_COMPLETION: {
            let {date, habitName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].habitInfo = {...state[date][habitName].habitInfo}
            newState[date][habitName].habitInfo.subtasks = [...state[date][habitName].habitInfo.subtasks]
            let subtasks = state[date][habitName].habitInfo.subtasks
            for (i in subtasks) {
                let subtask = subtasks[i]
                let [subtaskName, status] = subtask
                if (!status) {
                    allComplet
                    newState[date][habitName].habitInfo.subtasks[i][1] = true
                    break;
                }
            }
            newState[date][habitName].completed = (subtasks.filter((subtask) => !subtask[1]).length === 0) 
            return newState
        }
        case TOGGLE_PROGRESS_COMPLETION: {
            let {date, habitName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].habitInfo = {...state[date][habitName].habitInfo}
            if (state[date][habitName].habitInfo.progress < state[date][habitName].habitInfo.goal) {
                newState[date][habitName].habitInfo.progress = state[date][habitName].habitInfo.goal
                newState[date][habitName].completed = true
            }
            return newState
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
