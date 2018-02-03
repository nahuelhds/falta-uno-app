import React from 'react';

import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

import * as Firebase from 'firebase';

import Lang from 'lang'
import Colors from 'constants/Colors';

import MyMatchesList from 'components/MyMatchesList';

export default class MatchListScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('matchSelector.title'),
  })

  render() {
    const { player } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <MyMatchesList player={player} onPress={(match) =>this.props.navigation.navigate('Invite', { player, match })} />
        <Button
          title={Lang.t(`matchSelector.addMatch`)}
          containerViewStyle={styles.addMatchButtonContainer}
          backgroundColor={Colors.primary}
          onPress={() => this.props.navigation.navigate('AddMatch')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  addMatchButtonContainer: {
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
    width: '100%',
  }
})
