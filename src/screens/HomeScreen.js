import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import Lang from 'lang';
import { SearchBar, Header } from 'react-native-elements';
import Colors from 'constants/Colors';

export default class SearchScreen extends React.Component {
  // Definimos de forma dinamica (funcion) para que el lenguaje este bien calculado (sino recae en ingles)
  static navigationOptions = () => ({
    title: Lang.t('search.title'),
  });

  state = {
    search: "",
    currentPosition: {}
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
          currentPosition : {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          },
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar 
          clearIcon={this.state.search ? { name: 'clear', type: 'ionicons' } : false}
          containerStyle={{ width: '100%', backgroundColor: Colors.light }} 
          inputStyle={{backgroundColor: Colors.tabBar}}
          lightTheme
          onChangeText={(search) => {this.setState({ search })}}
          placeholder={Lang.t('search.placeholder')}/>
        <ScrollView>
          <Text>Latitude: {this.state.currentPosition.latitude}</Text>
          <Text>Longitude: {this.state.currentPosition.longitude}</Text>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
})
