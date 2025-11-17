import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
  Button,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';

const Home = () => {
  const [categorieslimit, setCategorieslimit] = useState([]);
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [donateModalVisible, setDonateModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false); // State for pull-to-refresh

  const [proId, setProId] = useState('');
  const [projectName, setProjectName] = useState('');
  const ip = '192.168.43.244';

  const fetchCategorieslimit = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/categories/limit`);
      setCategorieslimit(response.data);
    } catch (error) {
      console.error('Error fetching categories limit:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/categories`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategorieslimit();
    fetchProjects();
    fetchCategories();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchCategorieslimit(), fetchProjects(), fetchCategories()]);
    setRefreshing(false);
  };

  const handleDonateButtonPress = (projectId) => {
    setProId(projectId);
    setDonateModalVisible(true);
  };

  const handleNameButtonPress = (projectName) => {
    setProjectName(projectName);
    setDonateModalVisible(true);
  };

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [goalAmount, setgoalAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleTotalAmountChange = (e) => {
    setgoalAmount(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!selectedImage || !imageName || !goalAmount || !selectedCategory) {
      setMessage('Please select an image and provide all information.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    const imageType = selectedImage.split('.').pop();
    const imageUri = selectedImage.startsWith('file://')
      ? selectedImage
      : selectedImage.replace('content://', '');

    formData.append('image', {
      uri: imageUri,
      name: imageName,
      type: `image/${imageType}`,
    });
    formData.append('name', imageName);
    formData.append('goal', goalAmount);
    formData.append('categorie_name', selectedCategory);

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        setMessage('User not authenticated. Please log in.');
        return;
      }

      const response = await axios.post(`http://${ip}:5000/projects`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage('Project uploaded successfully');
      setShowModal(false);

      const updatedProjects = await axios.get(`http://${ip}:5000/projects`);
      setProjects(updatedProjects.data);
    } catch (error) {
      setMessage('Error uploading project');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const [donationAmount, setDonationAmount] = useState('');

  const handleDonate = (value) => {
    setDonationAmount(value);
  };

  const handleDonateSubmit = async () => {
    if (!donationAmount || isNaN(donationAmount) || donationAmount <= 0) {
      Alert.alert('Invalid Input', 'Please enter a valid donation amount.');
      return;
    }

    const donationData = {
      id_project: proId,
      project_name: projectName,
      amount: donationAmount,
    };

    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        Alert.alert('Authentication Error', 'User not authenticated. Please log in.');
        return;
      }

      const response = await axios.post(`http://${ip}:5000/donation`, donationData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        setDonateModalVisible(false);
        setDonationAmount('');
      }
    } catch (err) {
      console.error('Error while submitting donation:', err.message || err);
    }
  };


  return (
    <ScrollView style={styles.container}  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
      <View style={styles.headersss}>
      <View style={styles.headerTop}>
    <Text style={styles.title}>Fundini</Text>
    <TouchableOpacity style={styles.notificationIcon}>
      <Text>🔔</Text> {/* Replace with a proper notification icon */}
    </TouchableOpacity>
  </View>
  <View style={styles.searchContainer}>
    <View style={styles.searchInputContainer}>
      <Text style={styles.searchIcon}>🔍</Text> {/* Replace with an icon library if needed */}
      <TextInput 
        style={styles.searchInput} 
        placeholder="Search" 
        placeholderTextColor="#A8A8A8"
      />
    </View>
    <TouchableOpacity style={styles.locationIcon}>
      <Text>📍</Text> {/* Replace with an icon library if needed */}
    </TouchableOpacity>
  </View>
      </View>

      {/* Feature Categories */}
      <View style={styles.featureCategories}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Feature Categories</Text>
          <TouchableOpacity>
            <Text style={styles.viewMore}>View More</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.categoriesGrid}>
          {categorieslimit.map((category, index) => (
            <View key={index} style={styles.categoryCard}>
              <Image source={{ uri: "http://"+ip+":8081/"+category.image }} style={styles.categoryImage} />
              <Text style={styles.categoryTitle}>{category.name}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.newCampaigns}>
  <View style={styles.sectionHeader}>
    <Text style={styles.sectionTitle}>New Campaigns</Text>
    <TouchableOpacity>
      <Text style={styles.viewMore}>View More</Text>
    </TouchableOpacity>
  </View>
  <View style={styles.campaignGrid}>
  {projects
    .filter((project) => project.status === "accepted") // Filter projects by status
    .map((project, index) => (
      <View key={index} style={styles.campaignCard}>
        <Image source={{ uri: "http://"+ip+":8081/"+project.image }} style={styles.campaignImage} />
        <View style={styles.campaignDetails}>
          <Text style={styles.campaignTitle}>{project.name}</Text>
          <Text style={styles.campaignProgress}>
            Raised: {project.totalle} DT / Goal: {project.goal} DT
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${(project.totalle / project.goal) * 100}%` },
              ]}
            />
          </View>
        </View>
        <View style={styles.donateContainer}>
          <TouchableOpacity
            style={styles.donateButton}
            onPress={() => handleDonateButtonPress(project.id)}
            onPressIn={() => handleNameButtonPress(project.name)}
          >
            <Text style={styles.donateButtonText}>Donate</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
</View>


</View>


      //
      <Modal visible={showModal} animationType="slide" transparent={true}>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContent}>
      <View style={styles.uploadContainer}>
        <Text style={styles.header}>Upload a Project</Text>

        {/* Image Picker */}
        <TouchableOpacity onPress={handlePickImage} style={styles.imagePicker}>
          {selectedImage ? (
            <Text style={styles.imageText}>✔ Image Selected</Text>
          ) : (
            <Text style={styles.imageText}>📷 Select an Image</Text>
          )}
        </TouchableOpacity>

        {/* Name Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter image name"
          placeholderTextColor="#888"
          value={imageName}
          onChangeText={setImageName}
        />

        {/* Goal Amount Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter goal amount"
          placeholderTextColor="#888"
          value={goalAmount}
          onChangeText={setgoalAmount}
          keyboardType="numeric"
        />

        {/* Category Dropdown */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Select Category</Text>
          <Picker
            selectedValue={selectedCategory}
            onValueChange={handleCategoryChange}
            style={styles.dropdown}
          >
            {categories.map((it, index) => (
              <Picker.Item key={index} label={it.name} value={it.name} />
            ))}
          </Picker>
        </View>

        {/* Submit Button */}
        <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Upload</Text>
        </TouchableOpacity>

        {/* Loading Indicator */}
        

        {/* Message Display */}
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  </View>
</Modal>





      {/* Donate Modal */}
      <Modal visible={donateModalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.header}>Enter Donation Amount</Text>
          <Text style={styles.projectId}>Project ID: {proId}</Text>
          <Text style={styles.projectName}>Project Name: {projectName}</Text>

          <TextInput
            style={styles.donationInput}
            value={donationAmount}
            onChangeText={handleDonate}
            placeholder="Enter amount"
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleDonateSubmit}>
            <Text style={styles.submitButtonText}>Donate</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => setDonateModalVisible(false)}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setShowModal(true)}
      >
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </ScrollView>
  );
};

const CategoryCard = ({ title, imageUri }) => (
  <View style={styles.categoryCard}>
    <Image source={{ uri: imageUri }} style={styles.categoryImage} />
    <Text style={styles.categoryTitle}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  headersss: {
    backgroundColor: '#32CD32', // Green background
    padding: 20,
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  notificationIcon: {
    padding: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchIcon: {
    fontSize: 16,
    color: '#A8A8A8',
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  locationIcon: {
    marginLeft: 10,
    paddingHorizontal: 5,
  },
  featureCategories: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  viewMore: {
    fontSize: 14,
    color: '#1ABC9C',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  newCampaigns: { marginVertical: 20 },
  campaignGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
    paddingHorizontal: 10, // Added padding for consistent spacing
  },
  campaignCard: {
    width: "48%",
    marginBottom: 15, // Increased margin for better separation
    backgroundColor: "#fff",
    borderRadius: 10, // Slightly larger border radius for a softer look
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1, // Reduced shadow opacity for a subtle effect
    shadowRadius: 6, // Increased radius for smoother shadow
    elevation: 3,
    paddingBottom: 20, // Ensure there's space at the bottom for the Donate button
  },
  campaignImage: {
    width: "100%",
    height: 130, // Slightly taller image for better visibility
  },
  campaignDetails: {
    padding: 12, // Increased padding for balanced spacing
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Darker text for better readability
    marginBottom: 5, // Added spacing below title
  },
  campaignProgress: {
    color: "#555", // Slightly darker gray for improved visibility
    fontSize: 14,
  },
  progressBar: {
    width: "100%",
    height: 8, // Slimmer progress bar for a sleeker look
    backgroundColor: "#e0e0e0", // Lighter gray background
    borderRadius: 4,
    overflow: "hidden",
    marginVertical: 8,
  },
  progressBarFill: {
    backgroundColor: "#4caf50",
    height: "100%",
  },
  donateContainer: {
    alignItems: "center", // Center the button horizontally
    marginTop: 10, // Add margin to create space between the progress bar and button
  },
  donateButton: {
    backgroundColor: "#4caf50",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  donateButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  floatingButton: { position: 'absolute', bottom: 30, right: 30, backgroundColor: '#4caf50', padding: 20, borderRadius: 50 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { backgroundColor: '#fff', padding: 20, borderRadius: 10, width: 300 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  donationInput: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 5, marginBottom: 10, fontSize: 16 },
  submitButton: { backgroundColor: '#4caf50', padding: 12, borderRadius: 8, alignItems: 'center' },
  submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  cancelButton: { marginTop: 10, alignItems: 'center' },
  cancelButtonText: { color: '#888', fontSize: 16 },
  projectId: { fontSize: 14, color: '#888', marginBottom: 8 },
  projectName: { fontSize: 16, fontWeight: 'bold', marginBottom: 8 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  uploadContainer: {
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  imagePicker: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  imageText: {
    fontSize: 16,
    color: '#555',
  },
  input: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
  },
  formGroup: {
    width: '100%',
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 15,
  },
  message: {
    marginTop: 10,
    color: '#4CAF50',
    textAlign: 'center',
  },
  
});

export default Home;
