import { StackNavigator } from 'react-navigation';

import NearPlayersScreen from 'screens/HomeScreen';
import MatchSelectorScreen from 'screens/MatchSelectorScreen';
import InviteScreen from 'screens/InviteScreen';

export default StackNavigator(
  {
    NearPlayers: {
      screen: NearPlayersScreen
    },
    MatchSelector: {
      screen: MatchSelectorScreen,
    },
    Invite: {
      screen: InviteScreen,
    },
  },
  {
  }
);
