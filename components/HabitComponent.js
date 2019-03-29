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
import { toggleHabitCompletion } from '../actions/actions';

const mapStateToProps = (state, ownProps) => {
    let habitName = ownProps.habitName
    let date = ownProps.date
    let settings = state.settings.habitSettings[habitName]
    return {
        iconName: settings.icon,
        data: state.history[date][habitName]
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        toggleCompletion: (date, habitName) => dispatch(toggleHabitCompletion(date, habitName))
    }
}
class HabitComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            habitName: props.habitName,
            completed: props.data.completed
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.completed != this.props.completed) {
            this.setState({ completed: this.props.completed })
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
                        onPress={() => {}}
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
                            this.props.toggleCompletion(this.props.date, this.props.habitName)
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
        borderRightWidth: 2,
        borderColor: 'white',
        height: '95%'
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
        borderLeftWidth: 2,
        borderColor: 'white',
        height: '95%'
    },
    nameText: {
        fontSize: 30,
        fontFamily: Fonts.AvenirNext
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HabitComponent)