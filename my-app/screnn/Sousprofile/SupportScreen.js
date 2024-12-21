import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SupportScreen = () => {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack(); // Retour à l'écran précédent
  };

  return (
    <ScrollView style={styles.container}>
      {/* Titre avec "Go Back" */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={goBack}>
          <Text style={styles.header}>Support</Text>
        </TouchableOpacity>
      </View>

      {/* Texte descriptif */}
      <Text style={styles.text}>
        Here you can find assistance or reach out to us for further help.
      </Text>

      {/* Exemple d'une liste de questions ou d'informations */}
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Contact Support</Text>
        <Text style={styles.text}>Email: support@charity.org</Text>
        <Text style={styles.text}>Phone: +216 123 456 789</Text>
        <Text style={styles.text}>Address: 123 Rue de la Charité, Tunis, Tunisie</Text>
      </View>

      {/* FAQ */}
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>FAQ</Text>
        <Text style={styles.text}>How to make a donation?</Text>
        <Text style={styles.answerText}>You can make a donation securely online or via bank transfer. Click [here] to donate.</Text>

        <Text style={styles.text}>How to become a volunteer?</Text>
        <Text style={styles.answerText}>Fill out our volunteer form [here] to get started.</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#28A745',
    marginRight: 10,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#28A745',
  },
  subHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 6,
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    marginLeft: 10,
  },
  infoBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
});

export default SupportScreen;
