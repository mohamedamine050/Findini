import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const CategoriesScreen = () => {
  const [categories, setCategories] = useState([]);
  const navigation = useNavigation();

  const ip = "192.168.43.244";

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get(`http://${ip}:5000/categories`);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des catégories :', error);
      }
    };

    fetchCategories();
  }, []);

  // Function to handle category deletion
  const deleteCategory = async (id) => {
    try {
      await axios.delete(`http://${ip}:5000/categories/${id}`);
      // Refresh categories after deletion
      setCategories((prevCategories) => prevCategories.filter((category) => category.id !== id));
      Alert.alert('Succès', 'Catégorie supprimée avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression de la catégorie :', error);
      Alert.alert('Erreur', 'Une erreur est survenue lors de la suppression de la catégorie');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header avec flèche de retour */}
      <TouchableOpacity style={styles.header} onPress={() => navigation.goBack()}>
        <MaterialIcons name="arrow-back-ios" size={20} color="#32CD32" />
        <Text style={styles.headerText}>Liste des Catégories</Text>
      </TouchableOpacity>

      {/* Liste des catégories */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.categoryItem}>
            <Text style={styles.categoryText}>{item.name}</Text>
            <View style={styles.buttonContainer}>
              {/* Bouton de suppression */}
              <TouchableOpacity 
                style={styles.deleteButton}
                onPress={() => deleteCategory(item.id)}
              >
                <Icon name="minus" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 5,
    color: '#32CD32', // Couleur verte pour le texte
  },
  categoryItem: {
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
