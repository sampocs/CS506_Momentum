import React from 'react';
import {View, Text, StyleSheet} from 'react-native'

export default class MetricsHabitPreview extends React.Component {
    render() {
        return (
                <View style = {styles.container}>
                    <Text style={styles.habitText}>{this.props.habitName}</Text>
                    <View style={styles.streakContainer}>
                        <Text style={styles.streakText}>{this.props.streak}</Text>
                        <Text>in a row!</Text>
                    </View>
                </View>
        );
    }
}

const styles = StyleSheet.create({
  
    container: {
        height: 50,
        width: 300,
        backgroundColor: 'lightgray',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        borderColor: 'black',
        borderWidth: 2,
        marginBottom: 10
    }, 
    streakContainer: {
        height: 45,
        width: 100,
        backgroundColor: 'white',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    habitText: {
        fontWeight: 'bold',
        fontSize: 30
    },
    streakText: {
        fontWeight: 'bold',
        fontSize: 20
    }
})