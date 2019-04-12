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
export const ADD_HABIT_TO_SETTINGS = 'ADD_HABIT_TO_SETTINGS'
export const ADD_HABIT_TO_HISTORY = 'ADD_HABIT_TO_HISTORY'
export const UPDATE_NOTES = 'UPDATE_NOTES'
export const RESTORE_HISTORY_FROM_FIREBASE = 'RESTORE_HISTORY_FROM_FIREBASE'
export const RESTORE_SETTINGS_FROM_FIREBASE = 'RESTORE_SETTINGS_FROM_FIREBASE'
export const CLEAR_USER_DATA = 'CLEAR_USER_DATA'
export const DELETE_HABIT_FROM_PAST = 'DELETE_HABIT_FROM_PAST'
export const DELETE_HABIT_FROM_FUTURE = 'DELETE_HABIT_FROM_FUTURE'
export const DELETE_HABIT_FROM_SETTINGS = 'DELETE_HABIT_FROM_SETTINGS'


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

export const addHabitToSettings = (habitName, habitSettings) => ({
    type: ADD_HABIT_TO_SETTINGS,
    habitName,
    habitSettings
})

export const addHabitToHistory = (habitName, habitHistory, daysOfWeek) => ({
    type: ADD_HABIT_TO_HISTORY,
    habitName,
    habitHistory,
    daysOfWeek,
    currentDate: getCurrentDate()
})

export const updateNote = (habitName, date, notes) => ({
    type: UPDATE_NOTES,
    habitName,
    date,
    notes
})

export const restoreHistoryFromFirebase = (history) => ({
    type: RESTORE_HISTORY_FROM_FIREBASE,
    history
})

export const restoreSettingsFromFirebase = (settings) => ({
    type: RESTORE_SETTINGS_FROM_FIREBASE,
    settings
})

export const clearUserData = () => ({
    type: CLEAR_USER_DATA
})

export const deleteHabitFromPast = (habitName, startDate) => ({
    type: DELETE_HABIT_FROM_PAST,
    habitName,
    currentDate: getCurrentDate(),
    startDate
})

export const deleteHabitFromFuture = (habitName) => ({
    type: DELETE_HABIT_FROM_FUTURE,
    habitName,
    currentDate: getCurrentDate()
})

export const deleteHabitFromSettings = (habitName) => ({
    type: DELETE_HABIT_FROM_SETTINGS,
    habitName
})
