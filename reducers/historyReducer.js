import {
    TOGGLE_COMPLETE_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_NEXT_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    UPDATE_PROGRESS_AMOUNT,
    INCREMEMNT_PROGRESS_AMOUNT,
    ADD_HABIT_TO_HISTORY,
    UPDATE_NOTES,
    RESTORE_HISTORY_FROM_FIREBASE,
    DELETE_HABIT_FROM_FUTURE,
    DELETE_HABIT_FROM_PAST
} from '../actions/actions'
import { getNextDate, getDayOfWeek, getEndDate } from '../helpers/dateOperations';
import { HISTORY_FUTURE_DAYS, ALL_DATES_LIST } from '../constants/Constants';

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
            let subtasks = newState[date][habitName].habitInfo.subtasks
            newState[date][habitName].completed = (subtasks.filter((subtask) => !subtask[1]).length === 0) 
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
            newState[date][habitName].habitInfo = {...state[date][habitName].habitInfo}
            newState[date][habitName].habitInfo.progress = amount
            newState[date][habitName].completed = (amount >= state[date][habitName].habitInfo.goal)
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
        case ADD_HABIT_TO_HISTORY: {
            let {habitName, habitHistory, daysOfWeek, currentDate} = action
            let newState = {...state}
            let endDate = getEndDate(currentDate)
            let dateRange = ALL_DATES_LIST.filter((date) => (date >= currentDate && date <= endDate))
            for (i in dateRange) {
                let date = dateRange[i]
                let dow = getDayOfWeek(date)
                if (daysOfWeek[dow]) {
                    newState[date] = {...state[date]}
                    newState[date][habitName] = habitHistory
                }
            }
            return newState
        }
        case UPDATE_NOTES: { 
            let {habitName, date, notes} = action
            let newState = {...state}
            newState[date] = {...state[date]}
            newState[date][habitName] = {...state[date][habitName]}
            newState[date][habitName].notes = notes
            return newState
        }
        case RESTORE_HISTORY_FROM_FIREBASE: {
            let { history } = action
            return history
        }
        case DELETE_HABIT_FROM_FUTURE: {
            let { habitName, currentDate } = action
            let newState = {...state}
            let endDate = getEndDate(currentDate)
            let dateRange = ALL_DATES_LIST.filter((date) => (date >= currentDate && date <= endDate))
            for (i in dateRange) {
                let date = dateRange[i]
                newState[date] = {...state[date]}
                if (newState[date].hasOwnProperty(habitName)) {
                    delete newState[date][habitName]
                }
            }
            return newState
        }
        case DELETE_HABIT_FROM_PAST: {
            let { habitName, currentDate, startDate } = action 
            let newState = {...state}
            let dateRange = ALL_DATES_LIST.filter((date) => (date >= startDate && date <= currentDate))
            for (i in dateRange) {
                let date = dateRange[i]
                newState[date] = {...state[date]}
                if (newState[date].hasOwnProperty(habitName)) {
                    delete newState[date][habitName]
                }
            }
            return newState
        }
    }
    return state
}

export default historyReducer;
