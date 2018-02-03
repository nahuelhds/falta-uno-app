import { StackNavigator } from 'react-navigation';

import HomeScreen from 'screens/HomeScreen';
import MyProfileScreen from 'screens/MyProfileScreen';

export default StackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    MyProfile: {
      screen: MyProfileScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
