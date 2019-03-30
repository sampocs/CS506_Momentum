import { getCurrentDate } from '../helpers/dateOperations'

//Actions
export const TOGGLE_MINIMIZE_CAL = 'TOGGLE_MINIMIZE_CAL'
export const TOGGLE_COMPLETE_COMPLETION = 'TOGGLE_COMPLETE_COMPLETION'
export const TOGGLE_SUBTASK_COMPLETION = 'TOGGLE_SUBTASK_COMPLETION'
export const TOGGLE_PROGRESS_COMPLETION = 'TOGGLE_PROGRESS_COMPLETION'
export const TOGGLE_NEXT_SUBTASK_COMPLETION = 'TOGGLE_NEXT_SUBTASK_COMPLETION'
export const UPDATE_PROGRESS_AMOUNT = 'UPDATE_PROGRESS_AMOUNT'
export const INCREMEMNT_PROGRESS_AMOUNT = 'INCREMENT_PROGRESS_AMOUNT'
export const SELECT_DATE = 'SELECT_DATE'
export const SELECT_TODAY = 'SELECT_TODAY'


//Action Creators
export const toggleMinimizeCal = () => ({
    type: TOGGLE_MINIMIZE_CAL
})

export const toggleCompleteCompletion = (date, habitName) => ({
    type: TOGGLE_COMPLETE_COMPLETION,
    date, 
    habitName
})

export const toggleSubtaskCompletion = (date, habitName, index ) => ({
    type: TOGGLE_SUBTASK_COMPLETION,
    date,
    habitName,
    index
})

export const toggleNextSubtaskCompletion = (date, habitName) => ({
    type: TOGGLE_NEXT_SUBTASK_COMPLETION,
    date, 
    habitName
})

export const updateProgressAmount = (date, habitName, amount) => ({
    type: UPDATE_PROGRESS_AMOUNT,
    date, 
    habitName,
    amount
})

export const toggleProgressCompletion = (date, habitName) => ({
    type: TOGGLE_PROGRESS_COMPLETION,
    date, 
    habitName
})

export const incrementProgressAmount = (date, habitName, amount) => ({
    type: UPDATE_PROGRESS_AMOUNT,
    date, 
    habitName,
    amount
})

export const selectDate = (date) => ({
    type: SELECT_DATE,
    date
})

export const selectToday = () => ({
    type: SELECT_TODAY,  
    date: getCurrentDate()
})
