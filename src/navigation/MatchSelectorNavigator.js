import { StackNavigator } from 'react-navigation';

import MatchSelectorScreen from 'screens/MatchSelectorScreen';
import MatchAddScreen from 'screens/MatchAddScreen';

const MatchSelectorNavigator = StackNavigator(
  {
    MatchSelector: {
      screen: MatchSelectorScreen
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

export default MatchSelectorNavigator
