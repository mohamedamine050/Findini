import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const App = () => {
  const [categories, setCategories] = useState([]);
  const ip = '192.168.43.244';

  // Fetch categories from backend
  useEffect(() => {
    axios.get(`http://${ip}:5000/categories`)
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Render category item
  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: "http://"+ip+":8081/"+item.image }} style={styles.image} />
      <Text style={styles.text}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={item => item.id.toString()}
        renderItem={renderCategory}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: 'green',
  },
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: '#e6ffee',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
});

export default App;
