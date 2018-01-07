import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Lang from 'lang';
import { SearchBar, Header } from 'react-native-elements';
import Colors from 'constants/Colors';

export default class SearchScreen extends React.Component {
  // Dynamic definition so we can get the actual Lang locale
  static navigationOptions = () => ({
    title: Lang.t('search.title'),
  });

  state = {
    search: ""
  }

  render() {
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
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
