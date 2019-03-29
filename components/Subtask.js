
import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    CheckBox1
} from 'react-native';

import { CheckBox } from 'react-native-elements';
import {toggleSubtaskCompletion} from '../actions/actions';
import {connect} from 'react-redux';

//import { CheckBox } from 'react-native';
//import CheckBox2 from 'native-base'


const mapDispatchToProps = (dispatch) => {
    return {
        toggleSubtaskCompletion: (date, name, subtaskName) => {
            dispatch(toggleSubtaskCompletion(date, name, subtaskName))
        }
    }
}

class Subtask extends React.Component {
    state = {
        checked: true,

    }

    checkBoxChange() {
        this.setState({ checked: !this.state.checked });
        console.log('checked value: ' + this.state.checked)
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => {
                // change checked boolean when clicked
                this.setState({ checked: !this.state.checked });
                console.log('checked value: ' + this.state.checked)
            }}
            style={styles.classContainer}
        >

            <CheckBox
                title={item}
                // style={this.props.subtasks[item] ? styles.checkBoxClicked: styles.checkBox}
                checked={this.props.subtasks[item]}
                onPress={() => {
                    this.props.toggleSubtaskCompletion('2019-03-27', 'chores', item);
                }}
            ></CheckBox>
            {/* onValueChange={()=> this.checkBoxChange()} */}
        </TouchableOpacity>

    );

    _renderSeparator = () => {

        return (
            <View
                style={styles.separatorComponent}
            />
        );
    }

    render() {
        return (
            <FlatList
                data={this.props.data}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._renderSeparator}
            />
        );
    }
}

const styles = StyleSheet.create({
    separatorComponent: {
        backgroundColor: 'black',
        height: 1
    },
    classContainer: {
        flexDirection: 'row',
        paddingVertical: 20,
    },
    courseIdText: {
        marginRight: 20
    },
    courseRatingText: {
        textAlign: 'right',
        flex: 1
    },
    checkBox: {
        height: 10,
        width: 10
    },
    checkBoxClicked: {
        height: 10,
        width: 10,
        backgroundColor: 'pink'
    }
});

export default connect(null, mapDispatchToProps)(Subtask);