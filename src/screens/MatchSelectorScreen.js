import React from 'react';

import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import MatchesList  from '../components/MatchesList';
import AddMatchButton from '../components/AddMatchButton';

import * as Firebase from 'firebase';

import Lang from 'lang'
import Colors from 'constants/Colors';

export default class MatchSelectorScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('matchSelector.title'),
  })

  state = {
    matches: {}
  }

  componentDidMount(){
    const uid = Firebase.auth().currentUser.uid
    const db = Firebase.database()
    const matchesRef = db.ref('matches')
    db.ref(`users/${uid}/matches`).orderByChild('date').on('child_added', (userMatch) => {
      matchesRef.child(userMatch.key).once('value', (matchSnap) => {
        let match = {
          [matchSnap.key]: matchSnap.val()
        }
        const matches = Object.assign({}, this.state.matches, match)
        this.setState({ matches })
      })
    })
  }

  _onPressMatch(match, player) {
    this.props.navigation.navigate('Invite', { player, match })
  }

  _onPrssMatchButton(navigation) {
    navigation = this.props.navigation
    navigation.navigate('CreateMatch')
  }

  render() {
    const { player } = this.props.navigation.state.params;
    const matches = this.state.matches
    const matchesKeys = Object.keys(matches)
    return (
      <View style={styles.container}>
        {!matchesKeys.length ? (
          <View style={styles.emptyMacthesContainer}>
            <Text style={styles.emptyMatchesText}>{Lang.t(`matchSelector.noMatchesAvailable`)}</Text>
          </View>
        ) : (
          <View>
            <Text style={styles.label}>{Lang.t(`matchSelector.label`, player)}</Text>
            <MatchesList matches={ matches } player={ player } hideChevron={ false } 
            onPress={ (match, player) => this._onPressMatch(match, player) } />
          </View>
          )
        }
        <AddMatchButton onPress={ (navigation) => this._onPrssMatchButton(navigation) } />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyMacthesContainer: {
    flex: 1,
    marginBottom: 60,
    justifyContent: 'center',
  },
  emptyMatchesText: {
    alignSelf: 'center',
    fontSize: 24,
    color: Colors.muted
  },
  label: {
    textAlign: 'center',
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    fontSize: 16,
  },
  addMatchButtonContainer: {
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
    width: '100%',
  }
})
