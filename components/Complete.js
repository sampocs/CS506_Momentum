
import React from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Button,
    CheckBox,
     Dimensions
} from 'react-native';
import {toggleSingleCompletion} from '../actions/actions'; 
import {connect} from 'react-redux';

//import { CheckBox } from 'react-native';
//import CheckBox2 from 'native-base'

const mapDispatchToProps = (dispatch) => {
    return {
        toggleSingleCompletion: (completed) => {
            dispatch(toggleSingleCompletion(completed))
        }
    }
}

class Complete extends React.Component {
    
    renderText(complete) {
        console.log('here' + complete)
        if(complete){
           return <Button
            onPress={() => {
                this.props.toggleSingleCompletion(completed);
            }}
            title="COMPLETED"
            />
        }
        else{
           return <Button
           onPress={() => {
            this.props.toggleSingleCompletion(completed);
           }}
           title="NOT COMPLETED"
           />
        }
    }

    render() {
        return (
            <View style={styles.container}>
              {this.renderText(this.props.data)}
            </View>
        );
    }
}
    
    const styles = StyleSheet.create({
        header: {
            height: 75, 
            width: 350,
            backgroundColor: '#c93108'
        }, 
        button: {
            alignContent: 'flex-end'
        }
    });

    export default connect(null, mapDispatchToProps)(Complete);