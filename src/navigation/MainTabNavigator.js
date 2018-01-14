import React from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';

import Colors from 'constants/Colors';

import AvailabilityScreen from 'screens/AvailabilityScreen';
import HomeScreen from 'screens/HomeScreen';
import MyProfileScreen from 'screens/MyProfileScreen';

const navigationResolver = ({ navigation }) => ({
  tabBarIcon: ({ focused }) => iconResolver(navigation, focused)
})

const iconResolver = (navigation, focused) => {
  const { routeName } = navigation.state;
  let iconName;
  switch (routeName) {
    case 'Availability':
      iconName =
        Platform.OS === 'ios' ? `ios-hand${focused ? '' : '-outline'}` : 'md-hand';
      break;
    case 'Home':
      iconName =
        Platform.OS === 'ios'
          ? `ios-home${focused ? '' : '-outline'}`
          : 'md-home';
      break;
    // case 'MyMatches':
    //   iconName = Platform.OS === 'ios' ? `ios-football${focused ? '' : '-outline'}` : 'md-football';
    //   break;
    case 'MyProfile':
      iconName = Platform.OS === 'ios' ? `ios-person${focused ? '' : '-outline'}` : 'md-person';
      break;
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
    Availability: {
      screen: AvailabilityScreen,
    },
    Home: {
      screen: HomeScreen,
    },
    MyProfile: {
      screen: MyProfileScreen,
    },
  },
  {
    initialRouteName: 'Home',
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
