//Actions
export const TOGGLE_MINIMIZE_CAL = 'TOGGLE_MINIMIZE_CAL'
export const TOGGLE_HABIT_COMPLETION = 'TOGGLE_HABIT_COMPLETION'
export const TOGGLE_SUBTASK_COMPLETION = 'TOGGLE_SUBTASK_COMPLETION'
export const UPDATE_PROGRESS_AMOUNT = 'UPDATE_PROGRESS_AMOUNT'
export const INCREMEMNT_PROGRESS_AMOUNT = 'INCREMENT_PROGRESS_AMOUNT'


//Action Creators
export const toggleMimimizeCal = () => ({
    type: TOGGLE_MINIMIZE_CAL
})

export const toggleHabitCompletion = (date, habitName) => ({
    type: TOGGLE_HABIT_COMPLETION,
    date, 
    habitName
})

export const toggleSubtaskCompletion = (date, name, subtaskName ) => ({
    type: TOGGLE_SUBTASK_COMPLETION,
    date,
    name,
    subtaskName
})
export const updateProgressAmount = (date, habitName, amount) => ({
    type: UPDATE_PROGRESS_AMOUNT,
    date, 
    habitName,
    amount
})

export const incrementProgressAmount = (date, habitName, amount) => ({
    type: UPDATE_PROGRESS_AMOUNT,
    date, 
    habitName,
    amount
})
