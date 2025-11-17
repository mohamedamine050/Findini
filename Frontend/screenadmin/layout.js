import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Dashboard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  const navigation = useNavigation();
  const ip='192.168.43.244';

  useEffect(() => {
    const fetchData = async () => {
      const categoriesResponse = await axios.get(`http://${ip}:5000/categories`);
      setCategories(categoriesResponse.data);

      // You can add an endpoint to fetch products here if needed.
    };

    const fetchUsers = async () => {
      const usersResponse = await axios.get(`http://${ip}:5000/get-all-user`);
      setUsers(usersResponse.data);
    };

    const fetchProjects = async () => {
      const projectsResponse = await axios.get(`http://${ip}:5000/projects`);
      setProjects(projectsResponse.data);
    };

    fetchProjects();
    fetchData();
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>
      {/* Back Button */}
     

      <Text style={styles.welcomeText}>Welcome, Admin</Text>

      {/* Dashboard Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryBox}>
          <TouchableOpacity
            style={styles.summaryBox}
            onPress={() => navigation.navigate('Userlist')}
          >
            <Text style={styles.summaryText}>Users</Text>
            <Text style={styles.summaryCount}>{users.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryBox}>
          <TouchableOpacity
            style={styles.summaryBox}
            onPress={() => navigation.navigate('projectsall')}
          >
            <Text style={styles.summaryText}>Projects</Text>
            <Text style={styles.summaryCount}>{projects.length}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryBox}>
          <TouchableOpacity
            style={styles.summaryBox}
            onPress={() => navigation.navigate('CategorieDetail')}
          >
            <Text style={styles.summaryText}>Categories</Text>
            <Text style={styles.summaryCount}>{categories.length}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Actions Section */}
      <Text style={styles.sectionHeader}>Actions</Text>
      <View style={styles.actionsContainer}>
        {/* Categories */}
        <View style={styles.actionItem}>
          <Text style={styles.actionText}>Categories</Text>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate('Addcategorie')}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
      <TouchableOpacity onPress={() => navigation.navigate('ProjectsStautus')}>
        <View style={styles.actionItem}>
          <Text style={styles.actionText}>Projects Status</Text>
        </View>
      </TouchableOpacity>
      </View>
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
    color: '#32CD32', // Green color for the text
  },
  backButton: {
    padding: 10,
    backgroundColor: '#FF5722',
    borderRadius: 5,
    marginBottom: 20,
  },
  backButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  summaryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  summaryBox: {
    width: '48%',
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2,
    alignItems: 'center',
  },
  summaryText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  summaryCount: {
    fontSize: 18,
    color: '#32CD32',
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  actionsContainer: {
    marginTop: 10,
  },
  actionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  actionText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    width: 30,
    height: 30,
    backgroundColor: '#32CD32',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
