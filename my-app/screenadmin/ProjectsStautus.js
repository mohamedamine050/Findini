import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const ProjectStatusScreen = () => {
  const [projects, setProjects] = useState([]);
  const navigation = useNavigation();
  const ip='192.168.43.244';

  // Fetch projects from API
  const fetchProjects = async () => {
    try {
      const response = await axios.get(`http://${ip}:5000/projects/status`);
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Update project status and remove from the list
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://${ip}:5000/projects/${id}`, { status });
      // Remove the updated project from the local state
      setProjects(prevProjects => prevProjects.filter(project => project.id !== id));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  // Render each project
  const renderProject = ({ item }) => (
    <View style={styles.projectItem}>
      <Text style={styles.projectName}>{item.name}</Text>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.acceptButton}
          onPress={() => updateStatus(item.id, 'accepted')}
        >
          <Text style={styles.buttonText}>✓</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.rejectButton}
          onPress={() => updateStatus(item.id, 'rejected')}
        >
          <Text style={styles.buttonText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>
          ← <Text style={{ fontWeight: 'bold', color: '#28A745' }}>Liste des Projets Status</Text>
        </Text>
      </TouchableOpacity>

      {/* List of Projects */}
      <FlatList
        data={projects}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProject}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#28A745',
    fontSize: 18,
  },
  projectItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  projectName: {
    fontSize: 18,
  },
  buttons: {
    flexDirection: 'row',
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  rejectButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProjectStatusScreen;
