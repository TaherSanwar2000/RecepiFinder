import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import HTML from 'react-native-render-html';

const Detail = () => {
  const route = useRoute();
  const id = route.params.id;
  const {width} = useWindowDimensions();
  const [recipe, setRecipe] = useState(null);

  const getRecipeDetail = async () => {
    const apikey = 'bcb580a772ca43c49d7fcf072d20a667';
    const URL = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apikey}`;

    try {
      const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSave = async () => {
    try {
      // Retrieve existing recipes from AsyncStorage
      const existingRecipesJson = await AsyncStorage.getItem('savedRecipes');
      const existingRecipes = existingRecipesJson ? JSON.parse(existingRecipesJson) : [];
  
      // Extract title and image from the current recipe
      const { title, image } = recipe;
  
      // Check if the recipe with the same title already exists
      const isRecipeExists = existingRecipes.some((savedRecipe) => savedRecipe.title === title);
  
      if (!isRecipeExists) {
        // Add the title and image to the existing array
        const updatedRecipes = [...existingRecipes, { title, image }];
  
        // Save the updated array back to AsyncStorage
        await AsyncStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
  
        Alert.alert('Recipe saved successfully!');
      } else {
        Alert.alert('Recipe already saved!');
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
    }
  };
  

  useEffect(() => {
    getRecipeDetail();
  }, []);

  if (!recipe) {
    return (
      <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <ActivityIndicator size={50} color='blue'/>
      </View>
    );
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        <Image
          source={{uri: recipe.image}}
          style={{width: '100%', height: 200}}
        />
        <View style={{padding: 16}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#000'}}>
            {recipe.title}
          </Text>
          <Text style={{fontSize: 14, color: '#000', marginBottom: 8}}>
            {recipe.dishTypes.join(', ')}
          </Text>
          <Text
            style={styles.TextStyle}>
            Ingredients:
          </Text>
          {recipe.extendedIngredients.map(ingredient => (
            <Text
              key={ingredient.id}
              style={{color: '#000'}}>{`${ingredient.original}`}</Text>
          ))}
          <Text
            style={styles.TextStyle}>
            Instructions:
          </Text>
          <HTML source={{html: recipe.instructions}} contentWidth={width} />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => handleSave()}
        style={styles.SaveButton}>
        <Image
          source={require('../asset/Images/wishlist.png')}
          style={{height: 40, width: 40}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Detail;
const styles = StyleSheet.create({
 TextStyle:{
  fontSize: 16,
  fontWeight: 'bold',
  marginTop: 8,
  color: '#000',
 },
 SaveButton:{
  position: 'absolute',
  bottom: 16,
  right: 16,
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#e7feff',
  height: 80,
  width: 80,
  borderRadius: 100,
 }
});