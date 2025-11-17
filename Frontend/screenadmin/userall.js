import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const UserScreen = () => {
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const ip = '192.168.43.244';

  // Appel à l'API pour récupérer les utilisateurs
  useEffect(() => {
    fetch(`http://${ip}:5000/get-all-user`) // Remplacez par l'URL de votre backend
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error('Erreur lors du chargement des utilisateurs:', error));
  }, []);

  // Fonction pour afficher chaque utilisateur
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemEmail}>{item.email}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton de retour */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={20} color="#32CD32" />
        <Text style={styles.headerText}>Liste des Utilisateurs</Text>
      </TouchableOpacity>

      {/* Liste des utilisateurs */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#32CD32', // Couleur verte pour le titre
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  itemEmail: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
});

export default UserScreen;
