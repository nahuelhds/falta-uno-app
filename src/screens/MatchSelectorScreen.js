import React from 'react';

import { ScrollView, View, StyleSheet } from 'react-native';
import { List, ListItem, Text, Button } from 'react-native-elements';

import * as Firebase from 'firebase';
import moment from 'moment'

import Lang from 'lang'
import Colors from 'constants/Colors';

export default class MatchSelectorScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('matchSelector.title'),
  })

  constructor(props) {
    super(props);

    const uid = Firebase.auth().currentUser.uid
    const db = Firebase.database()
    const matchesRef = db.ref('matches')
    db.ref(`users/${uid}/matches`).orderByChild('date').on('child_added', (userMatch) => {
      matchesRef.child(userMatch.key).once('value', (matchSnap) => {
        let match = {
          [matchSnap.key] : matchSnap.val()
        }
        const matches = Object.assign({}, this.state.matches, match)
        this.setState({ matches })
      })
    })
  }

  state = {
    matches: {}
  }

  render() {
    const matches = this.state.matches
    const matchesKeys = Object.keys(matches)
    return (
      <View style={styles.container}>
        {!matchesKeys.length ? (
          <View style={styles.emptyMacthesContainer}>
            <Text style={styles.emptyMatchesText}>{Lang.t(`matchSelector.noMatchesAvailable`)}</Text>
          </View>
        ) : (
            <ScrollView>
              <List>
                {matchesKeys.map((key) => {
                  const match = matches[key]
                  return (
                    <ListItem
                      key={key}
                      title={match.name}
                      subtitle={match.place}
                      rightTitle={moment(match.date).calendar()}
                    // onPress={() => this.props.navigation.navigate('MatchSelector', { player })}
                    />
                  )
                })}
              </List>
            </ScrollView>
          )
        }
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
  addMatchButtonContainer: {
    bottom: 0,
    marginLeft: 0,
    position: 'absolute',
    width: '100%',
  }
})
