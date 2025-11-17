import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // for getting token
import axios from 'axios'; // Import axios

const MyDonationsScreen = ({ navigation }) => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  ip = '192.168.43.244'; // your ip address

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('userToken');
        if (!token) {
          console.log('User is not logged in');
          return;
        }

        // Fetch the donations using axios
        const response = await axios.get(`http://${ip}:5000/donationHistorique`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        // Set the donations data to state
        setDonations(response.data);
      } catch (error) {
        console.error('Error fetching donations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="green" />
        </TouchableOpacity>
        <Text style={styles.title}>My Donations</Text>
      </View>

      {loading ? (
        <Text>Loading donations...</Text>
      ) : (
        <FlatList
          data={donations}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.donationItem}>
              <Text style={styles.projectName}>{item.project_name}</Text>
              <Text style={styles.amount}>{item.amount} DT</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
  },
  donationItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row', // Align project name and amount in a row
    justifyContent: 'space-between', // Distribute the items on both ends
    alignItems: 'center', // Center align vertically
  },
  projectName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  amount: {
    fontSize: 16,
    color: 'green',
  },
});

export default MyDonationsScreen;
