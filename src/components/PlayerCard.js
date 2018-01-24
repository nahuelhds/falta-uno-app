import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Card, Avatar } from 'react-native-elements';

import WhatsAppNotifier from './WhatsAppNotifier';

export default class PlayerCard extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        const player = this.props.player
        return (
            <Card flexDirection='row'>
               { /** <WhatsAppNotifier player={player}/> **/ } 
                <Avatar
                medium
                rounded
                source={ { uri:player.photoURL } }
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
                />
                <View>
                    <Text style = { styles.playerName }> { player.displayName } </Text>
                    <Text style = { styles.playerDistance }> A { this.props.distance } km de distancia </Text>
                </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    playerName: {
        fontSize: 18,
        color: '#2E2E2E',
        paddingTop: 2
    },
    playerDistance: {
        fontSize: 12,
        color: '#848484',
        paddingTop: 5
    }
  })
