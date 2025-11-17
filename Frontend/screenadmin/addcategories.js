import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageName, setImageName] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const ip = '192.168.43.244';  // Replace with your server's IP address

  // Request permission to access the media library
  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'You need to grant permission to access your images.');
    }
  };

  // Handle image selection
  const handlePickImage = async () => {
    await requestPermission();
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedImage || !imageName) {
      setMessage('Please select an image and provide a name.');
      return;
    }

    setLoading(true); // Show loading spinner

    const formData = new FormData();
    const imageType = selectedImage.split('.').pop(); // Check file extension

    // On Android, expo returns a file:// URI, which should be fine as is
    const imageUri = selectedImage.startsWith('file://') ? selectedImage : selectedImage.replace('content://', '');

    formData.append('image', {
      uri: imageUri,
      name: imageName,
      type: `image/${imageType}`,
    });
    formData.append('name', imageName);

    try {
      const response = await axios.post(`http://${ip}:5000/categories`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 200) {
        setMessage('Image uploaded successfully.');
      } else {
        setMessage('Error uploading image.');
      }
    } catch (error) {
      setMessage('Error uploading image.');
      console.error('Error:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false); // Hide loading spinner
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.goBackButton} onPress={() => navigation.goBack()}>
        <Text style={styles.goBackText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Upload an Image</Text>

      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={handlePickImage}>
        {selectedImage ? (
          <Image source={{ uri: selectedImage }} style={styles.previewImage} />
        ) : (
          <Text style={styles.imagePickerText}>Select an Image</Text>
        )}
      </TouchableOpacity>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter image name"
        value={imageName}
        onChangeText={setImageName}
      />

      {/* Submit Button */}
      <Button title="Upload" color="#4CAF50" onPress={handleSubmit} />

      {/* Loading Spinner */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" style={styles.loadingIndicator} />}

      {/* Message Display */}
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fdfdfd',
  },
  goBackButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  goBackText: {
    fontSize: 24,
    color: '#4CAF50',
  },
  header: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  imagePicker: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 20,
  },
  imagePickerText: {
    color: '#aaa',
    fontSize: 16,
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  loadingIndicator: {
    marginTop: 20,
  },
  message: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ImageUpload;
