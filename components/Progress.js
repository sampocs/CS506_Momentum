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
import {updateProgressAmount} from '../actions/actions';
import {connect} from 'react-redux';

const mapDispatchToProps = (dispatch) => {
    return {
        toggleProgessCompletion: (date, name, subtaskName) => {
            dispatch(updateProgressAmount(date, name, subtaskName))
        }
    }
}

class Progress extends React.Component {

    render() {
        return (
            <View style={styles.container}>
            <TextInput
             placeholder="30"
             ></TextInput>
            <Text>/</Text>
            <Text>60</Text>
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

    }
})

export default connect(null, mapDispatchToProps)(Progress);