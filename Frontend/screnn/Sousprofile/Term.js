import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const TermsScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Go Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Terms and Conditions</Text>
      </View>

      {/* Descriptive Text */}
      <Text style={styles.text}>
        By using our site, you agree to the following terms:
      </Text>

      {/* Sections with Sub-Headers */}
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Donors' Responsibilities:</Text>
        <Text style={styles.text}>
          You agree to make donations only through our secure channels. All donations are used to fund our charity projects.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Volunteers' Responsibilities:</Text>
        <Text style={styles.text}>
          As a volunteer, you agree to adhere to the charity's policies and follow the instructions provided by our team.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Intellectual Property:</Text>
        <Text style={styles.text}>
          All site content, including logos and documents, is the exclusive property of our organization.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Limitation of Liability:</Text>
        <Text style={styles.text}>
          We are not responsible for errors or technical issues related to the use of our site.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Jurisdiction:</Text>
        <Text style={styles.text}>
          These terms are governed by the laws of Tunisia.
        </Text>
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

export default TermsScreen;
