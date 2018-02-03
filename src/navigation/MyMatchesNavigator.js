import { StackNavigator } from 'react-navigation';

import MyMatchesScreen from 'screens/MyMatchesScreen';
import MatchAddScreen from 'screens/MatchAddScreen';

export default StackNavigator(
  {
    MyMatches: {
      screen: MyMatchesScreen
    },
    AddMatch: {
      screen: MatchAddScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);
