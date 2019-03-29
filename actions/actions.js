//Actions
export const TOGGLE_MINIMIZE_CAL = 'TOGGLE_MINIMIZE_CAL'
export const TOGGLE_SUBTASK_COMPLETION = 'TOGGLE_SUBTASK_COMPLETION'
export const TOGGLE_PROGRESS_COMPLETION = 'TOGGLE_PROGESS_COMPLETION'
export const TOGGLE_SINGLE_COMPLETION = 'TOGGLE_SINGLE_COMPLETION'

//Action Creators
export const toggleMimimizeCal = () => ({
    type: TOGGLE_MINIMIZE_CAL
})

export const toggleSubtaskCompletion = (date, name, subtaskName ) => ({
    type: TOGGLE_SUBTASK_COMPLETION,
    date,
    name,
    subtaskName
})

export const toggleProgressCompletion = () => ({
    type: TOGGLE_PROGESS_COMPLETION,

})

export const toggleSingleCompletion = (completed) => ({
    type: TOGGLE_SINGLE_COMPLETION,
    completed
})