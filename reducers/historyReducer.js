import {
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    TOGGLE_SINGLE_COMPLETION
} from '../actions/actions'


const historyReducer = (state = {}, action) => {
    switch (action.type) {
        case TOGGLE_SUBTASK_COMPLETION:
            let {date, name, subtaskName} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][name] = {...state[date][name]}
            newState[date][name].habitInfo = {...state[date][name].habitInfo}
            newState[date][name].habitInfo.subtasks = {...state[date][name].habitInfo.subtasks}
            newState[date][name].habitInfo.subtasks[subtaskName] = !state[date][name].habitInfo.subtasks[subtaskName]
            return newState
        case TOGGLE_PROGRESS_COMPLETION:
            let {completed} = action
            let

            return null
        case TOGGLE_SINGLE_COMPLETION:
            return null
    }
    return state
}

export default historyReducer;