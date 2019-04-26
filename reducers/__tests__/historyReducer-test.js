import historyReducer from '../historyReducer'
import {
    TOGGLE_COMPLETE_COMPLETION,
    TOGGLE_SUBTASK_COMPLETION,
    TOGGLE_NEXT_SUBTASK_COMPLETION,
    TOGGLE_PROGRESS_COMPLETION,
    UPDATE_PROGRESS_AMOUNT,
    INCREMENT_PROGRESS_AMOUNT,
    UPDATE_NOTES,
    DELETE_HABIT_FROM_PAST,
    DELETE_HABIT_FROM_FUTURE,
    RESTORE_HISTORY_FROM_FIREBASE,
    ADD_HABIT_TO_HISTORY,
    EDIT_HISTORY_TODAY
} from '../../actions/actions'
import Constants from '../../constants/Constants';
import { buildFailureTestResult } from '@jest/test-result';

describe('History Reducer', () => {

    {/*//////////     TOGGLE_COMPLETE_COMPLETION TEST     ////////////*/ }

    test('TOGGLE_COMPLETE_COMPLETION', () => {
        expect(historyReducer({
            "2019-03-27": {
                Workout: {
                    completed: false,
                    notes: 'Ran',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Read: {
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
                Read: {
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
                    Read: {
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
                    Read: {
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
                Read: {
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
                Read: {
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
                    Read: {
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
                    Read: {
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

    {/*//////////     TOGGLE_SUBTASK_COMPLETION TEST     ////////////*/ }

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

    {/*//////////     TOGGLE_NEXT_SUBTASK_COMPLETION TEST     ////////////*/ }

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

    {/*//////////     TOGGLE_PROGRESS_COMPLETION TEST     ////////////*/ }

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

    {/*//////////     UPDATE_PROGRESS_AMOUNT TEST     ////////////*/ }

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

    {/*//////////     INCREMENT_PROGRESS_AMOUNT TEST     ////////////*/ }

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

    {/*//////////    UPDATE_NOTES TEST     ////////////*/ }

    test('UPDATE_NOTES', () => {
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
            type: UPDATE_NOTES,
            habitName: "Read",
            date: "2019-01-01",
            notes: 'This is a new note',
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        })
    })

    {/*//////////    RESTORE_HISTORY_FROM_FIREBASE TEST     ////////////*/ }

    test('RESTORE_HISTORY_FROM_FIREBASE', () => {
        expect(historyReducer({
            
        }, {
            type: RESTORE_HISTORY_FROM_FIREBASE,
            history: {
                "2019-01-01": {
                    Read: {
                        completed: false,
                        notes: "This is a new note",
                        type: Constants.PROGRESS,
                        habitInfo: {
                            progress: 0,
                            goal: 50
                        }
                    }
                }
            }
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        })
    })

    {/*//////////    DELETE_HABIT_FROM_PAST TEST     ////////////*/ }

    test('DELETE_HABIT_FROM_PAST', () => {
        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            },
            "2019-01-02": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            },
            "2019-01-03": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            },
            "2019-01-04": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        }, {
            type: DELETE_HABIT_FROM_PAST,
            habitName: 'Read',
            currentDate: '2019-01-03',
            startDate: '2019-01-01'
        })).toEqual({
            "2019-01-01": {},
            "2019-01-02": {},
            "2019-01-03": {},
            "2019-01-04": {
                Read: {
                    completed: false,
                    notes: "This is a new note",
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 50
                    }
                }
            }
        })
    })

    test('DELETE_HABIT_FROM_FUTURE', () => {
        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: true
                },
                Write: {}
            },
            "2019-01-02": {
                Read: {
                    completed: false
                },
            },
            "2019-01-03": {
                Write: {}
            },
            "2019-01-04": {
                Read: {
                    completed: false
                },
                Write: {}
            },
        }, {
            type: DELETE_HABIT_FROM_FUTURE,
            habitName: 'Read',
            currentDate: '2019-01-02',
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true
                },
                Write: {}
            },
            "2019-01-02": {},
            "2019-01-03": {
                Write: {}
            },
            "2019-01-04": {
                Write: {}
            },
        })
    })

    test('EDIT_HISTORY_TODAY', () => {
        expect(historyReducer({
            "2019-01-01": {
                Workout: {
                    completed: true,
                    notes: 'I worked out',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Workout',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.COMPLETE,
                habitInfo: {}
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Workout: {
                    completed: true,
                    notes: 'I worked out',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Workout: {
                    completed: true,
                    notes: 'I worked out',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Workout',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.COMPLETE,
                habitInfo: {}
            },
            daysOfWeek: [
                true,
                true,
                false,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Workout',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.COMPLETE,
                habitInfo: {}
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Workout: {
                    completed: false,
                    notes: '',
                    type: Constants.COMPLETE,
                    habitInfo: {}
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Workout',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.COMPLETE,
                habitInfo: {}
            },
            daysOfWeek: [
                true,
                true,
                false,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: 'I read',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 10,
                        goal: 60
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Read',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.PROGRESS,
                habitInfo: {
                    progress: 0,
                    goal: 100
                }
            },
            daysOfWeek: [
                true,
                true,
                false,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: 'I read',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 10,
                        goal: 60
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Read',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.PROGRESS,
                habitInfo: {
                    progress: 0,
                    goal: 100
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: 'I read',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 10,
                        goal: 100
                    }
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: 'I read',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 10,
                        goal: 60
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Read',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.PROGRESS,
                habitInfo: {
                    progress: 0,
                    goal: 5
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: true,
                    notes: 'I read',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 10,
                        goal: 5
                    }
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Read',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.PROGRESS,
                habitInfo: {
                    progress: 0,
                    goal: 5
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Read: {
                    completed: false,
                    notes: '',
                    type: Constants.PROGRESS,
                    habitInfo: {
                        progress: 0,
                        goal: 5
                    }
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: 'I did them',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', true], ['garbage', false]]
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Chores',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.SUBTASK,
                habitInfo: {
                    subtasks: [['laundry', false], ['chores', false], ['garbage', false]]
                }
            },
            daysOfWeek: [
                true,
                true,
                false,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Chores',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.SUBTASK,
                habitInfo: {
                    subtasks: [['laundry', false], ['chores', false], ['garbage', false]]
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: '',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', false], ['garbage', false]]
                    }
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: 'I did them',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', true], ['garbage', false]]
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Chores',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.SUBTASK,
                habitInfo: {
                    subtasks: [['laundry', false], ['chores', false], ['garbage', false]]
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: 'I did them',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', true], ['garbage', false]]
                    }
                },
                Write: {}
            }
        })

        expect(historyReducer({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: 'I did them',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', true], ['garbage', false]]
                    }
                },
                Write: {}
            }
        }, {
            type: EDIT_HISTORY_TODAY,
            habitName: 'Chores',
            currentDate: '2019-01-01',
            habitHistory: {
                completed: false,
                notes: '',
                type: Constants.SUBTASK,
                habitInfo: {
                    subtasks: [['laundry', false], ['chores', false], ['garbage', false], ['other thing', false]]
                }
            },
            daysOfWeek: [
                true,
                true,
                true,
                true,
                true,
                true,
                true
            ]
        })).toEqual({
            "2019-01-01": {
                Chores: {
                    completed: false,
                    notes: 'I did them',
                    type: Constants.SUBTASK,
                    habitInfo: {
                        subtasks: [['laundry', false], ['chores', false], ['garbage', false], ['other thing', false]]
                    }
                },
                Write: {}
            }
        })

    })
})