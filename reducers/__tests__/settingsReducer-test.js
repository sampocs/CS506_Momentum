import settingsReducer from '../settingsReducer'
import {
    ADD_HABIT_TO_SETTINGS,
    RESTORE_SETTINGS_FROM_FIREBASE,
    DELETE_HABIT_FROM_HABIT_SETTINGS,
    DELETE_HABIT_FROM_HABIT_ORDER,
    CHANGE_HABIT_ORDER
} from '../../actions/actions'
import Constants from '../../constants/Constants'

describe('Settings Reducer', () => {
    test('ADD_HABIT_TO_SETTINGS', () => {
        expect(settingsReducer({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                }
            },
            habitOrder: ['workout']
        }, {
            type: ADD_HABIT_TO_SETTINGS,
            habitName: 'read',
            habitSettings: {
                disappearWhenCompleted: false,
                daysOfWeek: [
                    false,
                    true,
                    false,
                    true,
                    false,
                    true,
                    true
                ],
                type: Constants.PROGRESS,
                habitInfo: {
                    unit: "min",
                    goal: 60
                },
                icon: 'book',
            }

        })).toEqual({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                },
                read: {
                    disappearWhenCompleted: false,
                    daysOfWeek: [
                        false,
                        true,
                        false,
                        true,
                        false,
                        true,
                        true
                    ],
                    type: Constants.PROGRESS,
                    habitInfo: {
                        unit: "min",
                        goal: 60
                    },
                    icon: 'book'
                }
            },
            habitOrder: ['workout', 'read']
        })
    })

    test('RESTORE_SETTINGS_FROM_FIREBASE', () => {
        expect(settingsReducer({
            settings: {}
        }, {
            type: RESTORE_SETTINGS_FROM_FIREBASE,
            settings: {
                user: {
                    startDate: '2019-03-01',
                    lastDate: '2021-01-01'
                },
                habitSettings: {
                    workout: {
                        disappearWhenCompleted: true,
                        daysOfWeek: [
                            false,
                            true,
                            true,
                            true,
                            true,
                            true,
                            false
                        ],
                        type: Constants.COMPLETE,
                        habitInfo: {},
                        icon: 'dumbbells'
                    },
                    read: {
                        disappearWhenCompleted: false,
                        daysOfWeek: [
                            false,
                            true,
                            false,
                            true,
                            false,
                            true,
                            true
                        ],
                        type: Constants.PROGRESS,
                        habitInfo: {
                            unit: "min",
                            goal: 60
                        },
                        icon: 'book'
                    }
                }
            }
        })).toEqual({
            user: {
                startDate: '2019-03-01',
                lastDate: '2021-01-01'
            },
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                },
                read: {
                    disappearWhenCompleted: false,
                    daysOfWeek: [
                        false,
                        true,
                        false,
                        true,
                        false,
                        true,
                        true
                    ],
                    type: Constants.PROGRESS,
                    habitInfo: {
                        unit: "min",
                        goal: 60
                    },
                    icon: 'book'
                }
            }
        })
    })

    test('DELETE_HABIT_FROM_SETTINGS', () => {
        expect(settingsReducer({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                },
                read: {
                    disappearWhenCompleted: false,
                    daysOfWeek: [
                        false,
                        true,
                        false,
                        true,
                        false,
                        true,
                        true
                    ],
                    type: Constants.PROGRESS,
                    habitInfo: {
                        unit: "min",
                        goal: 60
                    },
                    icon: 'book'
                }
            },
            habitOrder: ['workout', 'read']
        }, {
            type: DELETE_HABIT_FROM_HABIT_SETTINGS,
            habitName: 'read',
        })).toEqual({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                },
            },
            habitOrder: ['workout', 'read']
        })
    })

    test('DELETE_HABIT_FROM_HABIT_ORDER', () => {
        expect(settingsReducer({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                }
            },
            habitOrder: ['workout', 'read']
        }, {
            type: DELETE_HABIT_FROM_HABIT_ORDER,
            habitName: 'read',
        })).toEqual({
            habitSettings: {
                workout: {
                    disappearWhenCompleted: true,
                    daysOfWeek: [
                        false,
                        true,
                        true,
                        true,
                        true,
                        true,
                        false
                    ],
                    type: Constants.COMPLETE,
                    habitInfo: {},
                    icon: 'dumbbells'
                },
            },
            habitOrder: ['workout']
        })
    })

    test('CHANGE_HABIT_ORDER', () => {
        expect(settingsReducer({
            habitSettings: {
            },
            habitOrder: ['workout', 'read', 'chores']
        }, {
            type: CHANGE_HABIT_ORDER,
            prevOrder: ['2', '0', '1'],
            nextOrder: ['0', '2', '1']
        })).toEqual({
            habitSettings: {
            },
            habitOrder: ['workout', 'chores', 'read']
        })
    })
})