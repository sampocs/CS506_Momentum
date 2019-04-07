import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';
import MetricsHabitPreview from '../components/MetricsHabitPreview';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class MetricsHomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Metrics'
    }

    render() {
        return (
            <View style = {styles.container}>
                <View style = {styles.previews}>
                    <MetricsHabitPreview habitName='Habit' streak='18'/>
                    <MetricsHabitPreview habitName='Habit2' streak='14'/>
                    <MetricsHabitPreview habitName='Habit3' streak='12'/>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    previews: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsHomeScreen);
