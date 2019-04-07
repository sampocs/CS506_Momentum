import historyReducer from '../historyReducer'
import {
    TOGGLE_COMPLETE_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    TOGGLE_NEXT_SUBTASK_COMPLETION,
    UPDATE_PROGRESS_AMOUNT,
    INCREMEMNT_PROGRESS_AMOUNT
} from '../../actions/actions'

describe('History Reducer', () => {
    test('TOGGLE_COMPLETE_COMPLETION', () => {
        expect(historyReducer({
            "2019-03-27": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            },
            "2019-03-28": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            }
        }, {
            type: TOGGLE_COMPLETE_COMPLETION,
            date: "2019-03-27",
            habitName: "Workout"
        })).toEqual({
            "2019-03-27": { 
                Workout: {
                    completed: true,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            },
            "2019-03-28": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            }
        })

        expect(historyReducer({
            "2019-03-27": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            },
            "2019-03-28": { 
                Workout: {
                    completed: true,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            }
        }, {
            type: TOGGLE_COMPLETE_COMPLETION,
            date: "2019-03-28",
            habitName: "Workout"
        })).toEqual({
            "2019-03-27": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            },
            "2019-03-28": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: 'complete',
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: 'progress',
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            }
        })
    })
})