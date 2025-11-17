import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ProjectsAll = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();
  const ip='192.168.43.244';

  // Appel à l'API pour récupérer les projets
  useEffect(() => {
    fetch(`http://${ip}:5000/projects`) // Remplacez par l'URL de votre backend
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Erreur lors du chargement des projets:', error));
  }, []);

  // Fonction pour afficher chaque projet
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Nom du Projet : {item.name}</Text>
      <Text style={styles.itemDetails}>Total : {item.totalle} / Goal : {item.goal}</Text>
      <Text style={styles.itemDetails}>Utilisateur : {item.user_mail}</Text>
      <Text style={styles.itemDetails}>Catégorie : {item.categorie_name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header avec bouton de retour et texte */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back-ios" size={20} color="#32CD32" />
        <Text style={styles.headerText}>Liste des Projets</Text>
      </TouchableOpacity>
      
      {/* Liste des projets */}
      <FlatList
        data={projects}
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
    color: '#32CD32', // Couleur verte pour le texte
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
    marginBottom: 5,
    color: '#000',
  },
  itemDetails: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProjectsAll;
