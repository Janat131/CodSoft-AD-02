import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';

const Favorites = ({ route }) => {
  const [favoriteQuotes, setFavoriteQuotes] = useState(route.params.favoriteQuotes || []);

  const renderItem = ({ item }) => (
    <View style={{ padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
      <Text>{item.quote}</Text>
      <Text style={{ fontStyle: 'italic' }}>{item.author}</Text>
    </View>
  );

  const clearFavorites = () => {
    setFavoriteQuotes([]);
  };

  useEffect(() => {
    // If the favorite quotes change in the parent component (Quotes), update the list.
    if (route.params.favoriteQuotes) {
      setFavoriteQuotes(route.params.favoriteQuotes);
    }
  }, [route.params.favoriteQuotes]);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: '600', marginBottom: 10 }}>Favorite Quotes</Text>
        <FlatList
          data={favoriteQuotes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
      <TouchableOpacity
        onPress={clearFavorites}
        style={{
          backgroundColor: 'rgba(83, 114, 240, 1)',
          padding: 20,
          borderRadius: 30,
          margin: 20,
          alignItems: 'center',
        }}>
        <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Clear Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Favorites;
