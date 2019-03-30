import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'
import HabitIcon from './HabitIcon';
import { connect } from 'react-redux'
import CheckBoxCircle from './CheckBoxCircle';
import { toggleCompleteCompletion, toggleProgressCompletion } from '../actions/actions';
import { withNavigation } from 'react-navigation'
import Constants from '../constants/Constants';

const mapStateToProps = (state, ownProps) => {
    let habitName = ownProps.habitName
    let date = ownProps.date
    let settings = state.settings.habitSettings[habitName]
    return {
        iconName: settings.icon,
        dataOnDate: state.history[date][habitName],
        habitType: settings.type
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleCompleteCompletion: (date, habitName) => dispatch(toggleCompleteCompletion(date, habitName)),
        toggleProgressCompletion: (date, habitName) => dispatch(toggleProgressCompletion(date, habitName))
    }
}
class HabitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habitName: props.habitName,
            completed: props.dataOnDate.completed
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataOnDate.completed != this.props.dataOnDate.completed) {
            this.setState({ completed: this.props.dataOnDate.completed })
        }
    }

    defaultCheckboxAction() {
        switch (this.props.habitType) {
            case (Constants.COMPLETE): {
                this.props.toggleCompleteCompletion(this.props.date, this.props.habitName)
            }
            case (Constants.PROGRESS): {
                this.props.toggleProgressCompletion(this.props.date, this.props.habitName)
            }
            case (Constants.SUBTASK): {

            }
        }
    }

    render() {
        return (
            <View style={[
                styles.container,
                { backgroundColor: this.state.completed ? Colors.aqua : Colors.lightRed }
            ]}>
                <View style={styles.iconContainer}>
                    <HabitIcon icon={this.props.iconName} completed={this.state.completed} />
                </View>
                <View style={styles.nameContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.push('Habit', {
                                date: this.props.date,
                                habitName: this.props.habitName
                            })
                        }}
                    >
                        <Text style={[
                            styles.nameText,
                            { color: this.state.completed ? Colors.darkAqua : Colors.darkRed }
                        ]}> {this.props.habitName} </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            this.defaultCheckboxAction();
                        }}
                        >
                        <CheckBoxCircle completed={this.state.completed} />
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: 55,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 7,
        marginVertical: 3
    },
    iconContainer: {
        width: '22.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRightWidth: 1,
        borderColor: 'white',
        height: '90%'
    },
    nameContainer: {
        width: '55%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkboxContainer: {
        width: '22.5%',
        alignItems: 'center',
        justifyContent: 'center',
        borderLeftWidth: 1,
        borderColor: 'white',
        height: '90%'
    },
    nameText: {
        fontSize: 30,
        fontFamily: Fonts.AvenirNext
    }
})

export default withNavigation(connect(mapStateToProps, mapDispatchToProps)(HabitComponent))