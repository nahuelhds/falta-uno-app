import React from 'react';
import { ActivityIndicator ,ScrollView, Text, View, StyleSheet } from 'react-native';
import { SearchBar, Header } from 'react-native-elements';
import PlayerCard from '../components/PlayerCard';
import Colors from 'constants/Colors';
import Lang from 'lang';
import * as Firebase from 'firebase';

export default class SearchScreen extends React.Component {

  constructor(props){
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
    title: Lang.t('search.title'),
  });

  componentWillMount() {
    this._getNearPlayers();
  }

  _getNearPlayers() {
    this.usersRef.on("value", (snapshot) => {
      this.setState({ loading: false, players: snapshot.val() });
    })
  }

  render() {

    if (this.state.loading) {
      return <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    } else {
      const players = this.state.players
      return (
        <View style={styles.container}>
          <SearchBar 
            clearIcon={this.state.search ? { name: 'clear', type: 'ionicons' } : false}
            containerStyle={styles.searchBar} 
            inputStyle={styles.input}
            lightTheme
            onChangeText={(search) => {this.setState({ search })}}
            placeholder={Lang.t('search.placeholder')}/>
          <ScrollView>
            {Object.keys(players).map((key) => <PlayerCard player={players[key]} key={key} />)}
          </ScrollView>
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
    paddingTop: 20
  },
  searchBar: { 
    backgroundColor: Colors.light,
    width: '100%', 
  },
  input:{
    backgroundColor: Colors.tabBar
  }

})
