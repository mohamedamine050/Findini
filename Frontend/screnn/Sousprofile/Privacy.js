import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PrivacyScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Go Back Button */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>←</Text>
        </TouchableOpacity>
        <Text style={styles.header}>Privacy Policy</Text>
      </View>

      {/* Main Content */}
      <Text style={styles.text}>
        We respect your privacy and are committed to protecting your personal data.
      </Text>

      {/* Sections with Sub-Headers */}
      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Collected Data:</Text>
        <Text style={styles.text}>
          We collect personal information such as your name, email, and payment details when you make a donation.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Data Usage:</Text>
        <Text style={styles.text}>
          Your data is used to process donations, send receipts, and keep you informed about our organization’s projects.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Data Sharing:</Text>
        <Text style={styles.text}>
          We do not share your personal information with third parties except for payment processing or when required by law.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Security:</Text>
        <Text style={styles.text}>
          We use security measures to protect your data, including encryption for online transactions.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Cookies:</Text>
        <Text style={styles.text}>
          We use cookies to improve your experience on our site. You can manage your cookie preferences at any time.
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.subHeader}>Your Rights:</Text>
        <Text style={styles.text}>
          You have the right to access, modify, or delete your personal information by contacting us at privacy@charity.org.
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

export default PrivacyScreen;
