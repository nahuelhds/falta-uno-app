import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

import Lang from 'lang'
import Colors from 'constants/Colors';


export default class AddMatchButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            onPress: this.props.onPress? this.props.onPress : () => {}
        }
    }

    render(){
        return(
             
            <View style={styles.container} >
                <Button
                title={Lang.t(`matchList.addMatch`)}
                containerViewStyle={styles.addMatchButtonContainer}
                backgroundColor={Colors.primary}
                onPress={() => this.state.onPress(navigation)} />
            </View>
        ) 
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    addMatchButtonContainer: {
        bottom: 0,
        marginLeft: 0,
        position: 'absolute',
        width: '100%',
      }
})