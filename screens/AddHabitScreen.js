import React from 'react'
import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class AddHabitScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text> Add a Habit Screen </Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AddHabitScreen);
