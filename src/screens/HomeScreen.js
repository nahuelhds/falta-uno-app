import React from 'react';
import { ActivityIndicator, ScrollView, View, StyleSheet } from 'react-native';
import { SearchBar, Text } from 'react-native-elements';
import Colors from 'constants/Colors';
import Lang from 'lang';
import * as Firebase from 'firebase';

import PlayerCard from '../components/PlayerCard';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.usersRef = Firebase.database().ref(`users`)
      .orderByChild(`available`)
      .equalTo(true);

    this.state = {
      loading: true,
      search: "",
      currentPosition: {},
      players: {}
    }
  }

  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('home.title'),
  });

  componentWillMount() {
    this._getNearPlayers();
  }

  _getNearPlayers() {
    this.usersRef.on("value", (snapshot) => {
      const players = snapshot.val()
      this.setState({ loading: false, players: players ? players : {} });
    })
  }

  render() {

    if (this.state.loading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    } else {
      const players = this.state.players
      const playersKeys = Object.keys(players)
      if (playersKeys.length) {
        return (
          <View style={styles.container}>
            <SearchBar
              clearIcon={this.state.search ? { name: 'clear', type: 'ionicons' } : false}
              containerStyle={styles.searchBar}
              inputStyle={styles.input}
              lightTheme
              onChangeText={(search) => { this.setState({ search }) }}
              placeholder={Lang.t('home.placeholder')} />
            <ScrollView>
              {playersKeys.map((key) => <PlayerCard player={players[key]} key={key} />)}
            </ScrollView>
          </View>
        )
      }
      return (
        <View style={styles.container}>
          <Text style={styles.emptyPlayers}>{Lang.t(`home.noPlayers`)}</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  searchBar: {
    backgroundColor: Colors.light,
    width: '100%',
  },
  input: {
    backgroundColor: Colors.tabBar
  },
  emptyPlayers: {
    marginTop: 10,
    textAlign: 'center'
  }
})
