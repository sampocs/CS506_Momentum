import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView
} from 'react-native'
import { connect } from 'react-redux';
import Constants from '../constants/Constants'
import TriToggle from '../components/TriToggle'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

class MetricsSpecificHabitScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    setToggleState(section) {
        let mapping = {
            LEFT: Constants.WEEKLY,
            MIDDLE: Constants.MONTHLY,
            RIGHT: Constants.YEARLY
        }
        this.setState({ currentToggleSection: mapping[section] })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.triToggleContainer}>
                    <TriToggle
                        labels={['Weekly', 'Monthly', 'Yearly']}
                        setParentState={this.setToggleState.bind(this)}
                    />
                </View>

            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    triToggleContainer: {
        height: 100,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(MetricsSpecificHabitScreen);
