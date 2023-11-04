import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Share } from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const Quotes = ({ navigation }) => {
  const [quote, setQuote] = useState('Loading...');
  const [author, setAuthor] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteQuotes, setFavoriteQuotes] = useState([]); // Updated state to hold favorite quotes
  const apiKey = '7d210062e86b2b8deebdab67cce80d8f'; // Replace with your actual API key

  const fetchRandomQuote = () => {
    setIsLoading(true);
    axios.get('https://favqs.com/api/qotd', {
      headers: {
        'Authorization': `Token token="${apiKey}"`,
      }
    })
      .then(response => {
        const result = response.data.quote;
        setQuote(result.body);
        setAuthor(result.author);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching a new quote:', error);
        setIsLoading(false);
      });
  };

  const addToFavorites = (quote, author) => {
    setFavoriteQuotes([...favoriteQuotes, { quote, author }]); // Update favoriteQuotes state
  };

  const shareQuote = () => {
    Share.share({
      message: `"${quote}" - ${author}`,
    })
      .then(result => {
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // Shared via a specific app (result.activityType)
          } else {
            // Shared successfully
          }
        } else if (result.action === Share.dismissedAction) {
          // Share sheet dismissed
        }
      })
      .catch(error => {
        console.error('Error sharing:', error);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#5372F0' }}>
      <StatusBar barStyle="light-content" />

      <View style={{ width: '90%', backgroundColor: '#fff', borderRadius: 20, padding: 20 }}>
        <Text style={{
          textAlign: 'center',
          fontSize: 26,
          fontWeight: '600',
          color: '#333',
          marginBottom: 20,
        }}>Quote of the Day</Text>
        <FontAwesome5 name="quote-left" style={{ fontSize: 20, marginBottom: -12 }} />
        <Text style={{
          color: '#000',
          fontSize: 16,
          lineHeight: 26,
          letterSpacing: 1.1,
          fontWeight: '400',
          textAlign: 'center',
          marginBottom: 10,
          paddingHorizontal: 30,
        }}>
          {quote}
        </Text>
        <FontAwesome5 name="quote-right" style={{ fontSize: 20, textAlign: 'right', marginTop: -20, marginBottom: 20 }} />
        <Text style={{
          textAlign: 'right',
          fontWeight: '300',
          fontStyle: 'italic',
          fontSize: 16,
          color: '#000',
        }}>_{author}</Text>
        <TouchableOpacity
          onPress={fetchRandomQuote}
          style={{
            backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>
            {isLoading ? "Loading..." : "Refresh Quote"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            addToFavorites(quote, author);

            // this sends the qoute to new screen
            navigation.navigate('Favorites', {
              favoriteQuotes: [...favoriteQuotes, { quote, author }],
            });

            fetchRandomQuote();
          }}
          style={{
            backgroundColor: isLoading ? 'rgba(83, 114, 240, 0.7)' : 'rgba(83, 114, 240, 1)',
            padding: 20,
            borderRadius: 30,
          }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Add to Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={shareQuote} // Share button
          style={{
            backgroundColor: 'rgba(83, 114, 240, 1)',
            padding: 20,
            borderRadius: 30,
            marginTop: 20,
          }}>
          <Text style={{ color: '#fff', fontSize: 18, textAlign: 'center' }}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Quotes;
