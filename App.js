import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Quotes from './Qoutes'
import Favorites from './Favourites'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Quotes">
        <Stack.Screen name="Quotes" component={Quotes} options={{ title: 'Quote of the Day' }} />
        <Stack.Screen name="Favorites" component={Favorites} options={{ title: 'Favorite Quotes' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
