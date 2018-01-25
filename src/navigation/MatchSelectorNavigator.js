import { StackNavigator } from 'react-navigation';

import MatchSelectorScreen from 'screens/MatchSelectorScreen';
import AddMatchScreen from 'screens/AddMatchScreen';

const MatchSelectorNavigator = StackNavigator(
  {
    MatchSelector: {
      screen: MatchSelectorScreen
    },
    AddMatch: {
      screen: AddMatchScreen
    }
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);

export default MatchSelectorNavigator
