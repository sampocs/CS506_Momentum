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
        completed: state.history[ownProps.date][ownProps.habitName].completed
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
                <TextInput
                    placeholder="30"
                    keyboardType={'numeric'}
                    returnKeyType={'done'}
                    placeholderTextColor={Colors.lightGreyText}
                    maxLength={5}
                    onChangeText={(text) => {
                        this.setState({ progress: text })
                    }}
                    style={styles.inputFieldText}
                    value={this.state.progress}
                    onEndEditing={() => {
                        this.props.updateProgressAmount(this.props.date, this.props.habitName, parseInt(this.state.progress))
                    }}

                ></TextInput>
                <Text style={styles.inputFieldText}>/</Text>
                <Text style={styles.inputFieldText}>{this.state.goal}</Text>
                {/* <ProgressBar.Bar  /> */}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        // justifyContent: 'center',
        //  paddingTop: 20,
        marginTop: 20,
        borderRadius: 15,
        borderWidth: 0.5,
        borderColor: '#d6d7da',
        width: 100

    },
    inputFieldText: {
        color: Colors.aqua,
        fontSize: 40,
        fontFamily: Fonts.AvenirNext,
        textAlign: 'center',
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress);