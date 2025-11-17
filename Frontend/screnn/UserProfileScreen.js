import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome'; // Add your preferred icon library
import { useNavigation } from '@react-navigation/native';


const UserProfile = ({ navigation }) => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const ip = "192.168.43.244";


  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      

      const res = await axios.get(`http://${ip}:5000/profile`, {
       
      });
      setUser(res.data.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };


  const updateProfile = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setError('No token found');
        return;
      }

      await axios.post(
        `http://${ip}:5000/profile`,
        { name: user.name, email: user.email },
        { headers: { 'Authorization': `Bearer ${token}` } },
      );
      
      setEditMode(false);
      fetchUserProfile();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update profile');
    }
  };

  const handleInputChange = (name, value) => {
    setUser({ ...user, [name]: value });
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const logout = async () => {
    try {
      // Remove the user token from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      
      // Redirect to the login screen
      navigation.navigate('Login');
  
      // Navigate to the login screen
      
    } catch (err) {
      setError('Failed to log out');
    }
  };
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity onPress={updateProfile}>
          <Text style={styles.saveText}>Save</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading...</Text> // Show loading state
      ) : error ? (
        <Text style={styles.error}>{error}</Text> // Show error message if API call fails
      ) : (
        <>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              style={styles.profileImage}
              source={user.avatar ? { uri: user.avatar } : ('./assets/default-avatar.png')}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Icon name="camera" size={24} color="white" />
            </TouchableOpacity>
          </View>

          {/* Full Name */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={user.name}
                  onChangeText={(value) => handleInputChange('name', value)}
                  placeholder="Enter full name"
                />
              ) : (
                <Text style={styles.inputText}>{user.name}</Text>
              )}
              <TouchableOpacity onPress={() => setEditMode(true)}>
                <Icon name="edit" size={20} color="green" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Email */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputWrapper}>
              {editMode ? (
                <TextInput
                  style={styles.input}
                  value={user.email}
                  onChangeText={(value) => handleInputChange('email', value)}
                  placeholder="Enter email"
                  keyboardType="email-address"
                />
              ) : (
                <Text style={styles.inputText}>{user.email}</Text>
              )}
              <TouchableOpacity onPress={() => setEditMode(true)}>
                <Icon name="edit" size={20} color="green" style={styles.editIcon} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {/* Additional Options */}
      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Historiquedonation')}>
          <Text style={styles.menuText}>My Donations</Text>
        </TouchableOpacity>
       
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('SupportScreen')}>
          <Text style={styles.menuText}>Support</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('TermsScreen')}>
          <Text style={styles.menuText}>Terms</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('PrivacyScreen')}>
          <Text style={styles.menuText}>Privacy</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={logout} >
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c7f5e',
  },
  saveText: {
    fontSize: 16,
    color: '#2c7f5e',
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ccc',
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'green',
    borderRadius: 25,
    padding: 8,
  },
  inputContainer: {
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    padding: 10,
    paddingLeft: 20,
    fontSize: 16,
    flex: 1,
  },
  inputText: {
    fontSize: 16,
    flex: 1,
    color: '#333',
  },
  editIcon: {
    marginLeft: 10,
  },
  menuContainer: {
    marginTop: 30,
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  menuText: {
    fontSize: 18,
    color: '#333',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  footer: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f5f5f5',
    textAlign: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#333',
  },
});

export default UserProfile;
