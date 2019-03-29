//Actions
export const TOGGLE_MINIMIZE_CAL = 'TOGGLE_MINIMIZE_CAL'
export const TOGGLE_HABIT_COMPLETION = 'TOGGLE_HABIT_COMPLETION'


//Action Creators
export const toggleMimimizeCal = () => ({
    type: TOGGLE_MINIMIZE_CAL
})

export const toggleHabitCompletion = (date, habitName) => ({
    type: TOGGLE_HABIT_COMPLETION,
    date, 
    habitName
})