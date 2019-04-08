import React from 'react';
import { TextInput } from 'react-native-gesture-handler';
import ProgressBar from 'react-native-progress'
//import { ProgressBar } from 'react-native-paper';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
} from 'react-native';
import { updateProgressAmount } from '../actions/actions';
import { connect } from 'react-redux';
import Colors from '../constants/Colors'
import Fonts from '../constants/Fonts'

const mapStateToProps = (state, ownProps) => {
    return {
        progress: state.history[ownProps.date][ownProps.habitName].habitInfo.progress.toString(),
        goal: state.history[ownProps.date][ownProps.habitName].habitInfo.goal.toString(),
        completed: state.history[ownProps.date][ownProps.habitName].completed,
        unit: state.settings.habitSettings[ownProps.habitName].habitInfo.unit
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        updateProgressAmount: (date, name, amount) => {
            dispatch(updateProgressAmount(date, name, amount))
        }
    }
}

class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: props.completed,
            progress: props.progress,
            goal: props.goal
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevProps.completed != this.props.completed)
            || (prevProps.progress != this.props.progress)
            || (prevProps.goal != this.props.goal)) {
            this.setState({
                completed: this.props.completed,
                progress: this.props.progress,
                goal: this.props.goal
            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        placeholder={''}
                        keyboardType={'numeric'}
                        returnKeyType={'done'}
                        placeholderTextColor={Colors.lightGreyText}
                        maxLength={5}
                        onChangeText={(text) => {
                            this.setState({ progress: text })
                            this.setState({ completed: parseInt(text) >= parseInt(this.state.goal)})
                        }}
                        onFocus={() => {
                            if (this.state.progress === '0') {
                                this.setState({ progress: ''})
                            }
                        }}
                        style={[
                            styles.inputFieldText,
                            {color: parseInt(this.state.progress) >= parseInt(this.state.goal) ? Colors.calendarBlue : Colors.lightGreyText}]}
                        value={this.state.progress}
                        onEndEditing={() => {
                            if (this.state.progress === '') {
                                this.setState({ progress: '0'})
                                this.props.updateProgressAmount(this.props.date, this.props.habitName, 0)
                            }
                            else {
                                this.props.updateProgressAmount(this.props.date, this.props.habitName, parseInt(this.state.progress))
                            }
                        }}
                        onSubmitEditing={() => {
                            if (this.state.progress === '') {
                                this.setState({ progress: '0'})
                                this.props.updateProgressAmount(this.props.date, this.props.habitName, 0)
                            }
                            else {
                                this.props.updateProgressAmount(this.props.date, this.props.habitName, parseInt(this.state.progress))
                            }
                        }}
                    >
                    </TextInput>
                </View>
                <Text style={styles.goalText}>/</Text>
                <Text style={styles.goalText}>{this.state.goal}</Text>
                <Text style={styles.unitText}>{` ${this.props.unit}`}</Text>
                {/* <ProgressBar.Bar  /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    inputFieldText: {
        fontSize: 100,
        fontFamily: Fonts.AvenirNext
    },
    goalText: {
        color: Colors.calendarBlue,
        fontSize: 50,
        fontFamily: Fonts.AvenirNext,
    },
    unitText: {
        color: Colors.calendarBlue,
        fontSize: 30,
        fontFamily: Fonts.AvenirNext
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress);