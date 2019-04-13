import historyReducer from '../historyReducer'
import {
    TOGGLE_COMPLETE_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_NEXT_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    UPDATE_PROGRESS_AMOUNT,
    INCREMENT_PROGRESS_AMOUNT,
    ADD_HABIT_TO_HISTORY,
    UPDATE_NOTES,
    RESTORE_HISTORY_FROM_FIREBASE,
    DELETE_HABIT_FROM_FUTURE,
    DELETE_HABIT_FROM_PAST
} from '../../actions/actions'
import Constants from '../../constants/Constants';

describe('History Reducer', () => {
    test('TOGGLE_COMPLETE_COMPLETION', () => {
        expect(historyReducer({
            "2019-03-27": { 
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
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
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read:  {
                    completed: false,
                    notes: 'In the book, I learned...',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 30,
                        goal: 60
                    }			
                },
            }
        })
    })

    test('TOGGLE_SUBTASK_COMPLETION', () => {
        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', false], ['B', false], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
            index: 0
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', false]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
            index: 0
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', false], ['B', false], ['C', false]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
            index: 2
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        }, {
            type: TOGGLE_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
            index: 1
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', true]]
                    }
                }
            }
        })

    })

    test('TOGGLE_NEXT_SUBTASK_COMPLETION', () => {
        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', false], ['B', false], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', false]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', false]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        })


        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', true]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', false], ['C', false]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', false]]
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        }, {
            type: TOGGLE_NEXT_SUBTASK_COMPLETION,
            date: "2019-01-01",
            habitName: "Chores",
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: true,
                    notes: "",
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['A', true], ['B', true], ['C', true]]
                    }
                }
            }
        })
    })

    test('TOGGLE_PROGRESS_COMPLETION', () => {
        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: TOGGLE_PROGRESS_COMPLETION,
            date: "2019-01-01",
            habitName: "Read",
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        }, {
            type: TOGGLE_PROGRESS_COMPLETION,
            date: "2019-01-01",
            habitName: "Read",
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        }, {
            type: TOGGLE_PROGRESS_COMPLETION,
            date: "2019-01-01",
            habitName: "Read",
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        })
    })


    test('UPDATE_PROGRESS_AMOUNT', () => {
        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: UPDATE_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 25
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: UPDATE_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 50
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: UPDATE_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 60
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 60,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        }, {
            type: UPDATE_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 25
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        })
    })

    test('INCREMENT_PROGRESS_AMOUNT', () => {
        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: INCREMENT_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 25
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        }, {
            type: INCREMENT_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 25
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 25,
                        goal: 50
                    }
                }
            }
        }, {
            type: INCREMENT_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 50
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 75,
                        goal: 50
                    }
                }
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 50,
                        goal: 50
                    }
                }
            }
        }, {
            type: INCREMENT_PROGRESS_AMOUNT,
            date: "2019-01-01",
            habitName: "Read",
            amount: 25
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: "",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 75,
                        goal: 50
                    }
                }
            }
        })
    })

})