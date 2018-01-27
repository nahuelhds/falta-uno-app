import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from 'constants/Colors';

import MyProfileScreen from 'screens/MyProfileScreen';
import NearPlayersScreen from 'screens/NearPlayersScreen';
import NearPlayerScreen from '../screens/NearPlayersScreen';

const navigationResolver = ({ navigation }) => ({
  tabBarIcon: ({ focused }) => iconResolver(navigation, focused)
})

const iconResolver = (navigation, focused) => {
  const { routeName } = navigation.state;
  let iconName;
  switch (routeName) {
    case 'MyProfile':
      iconName =
        Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
      break;
    case 'NearPlayers':
      iconName =
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home';
      break;
    // case 'MyMatches':
    //   iconName = Platform.OS === 'ios' ? `ios-football${focused ? '' : '-outline'}` : 'md-football';
    //   break;
  }
  return (
    <Ionicons
      name={iconName}
      size={28}
      style={styles.icon}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

export default TabNavigator(
  {
    NearPlayers: {
      screen: NearPlayerScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
    },
  },
  {
    initialRouteName: 'NearPlayers',
    navigationOptions: navigationResolver,
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
})
