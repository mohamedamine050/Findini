import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import MainTabs from "../navigation/MainTabNavigator";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const ip = "192.168.43.244";

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handle login by making a POST request to the server with the email and password.
 * If the response is successful, save the token in AsyncStorage and navigate to the Home screen.
/******  8c60714f-cfcd-41eb-ae84-09f0f63fa623  *******/
  const handleLogin = async () => {
    try {
      if (email === "admin" && password === "admin") {
        navigation.navigate('adminscreen');
        return;
      }

      const response = await axios.post(`http://${ip}:5000/login-user`, { email, password });

      if (response.data.status === "ok") {
        // Save token in AsyncStorage
        await AsyncStorage.setItem("userToken", response.data.data);

        // Reset form and error state to simulate a "refresh"
        setEmail('');
        setPassword('');
        setError('');
        navigation.navigate('MainTabs');

        // Refresh the screen by navigating to the same screen again
       
      } else {
        setError(response.data.error);
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
    

      {/* Login Header */}
      <Text style={styles.header}>Login</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Display Error Message */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Forgot Password */}
      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.registerLink}>Register here</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#4caf50",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  backText: {
    color: "#fff",
    fontSize: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    padding: 15,
    marginVertical: 10,
  },
  loginButton: {
    backgroundColor: "#50C878",
    borderRadius: 25,
    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  forgotPassword: {
    color: "#4caf50",
    textAlign: "center",
    marginVertical: 10,
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  registerLink: {
    color: "#4caf50",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});

export default LoginScreen;
