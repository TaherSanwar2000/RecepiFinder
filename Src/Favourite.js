import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Favourite = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const fetchSavedRecipes = async () => {
    try {
      const savedRecipeData = await AsyncStorage.getItem('savedRecipes');
      console.log('Async data ------------', savedRecipeData);
      if (savedRecipeData) {
        const savedRecipesArray = JSON.parse(savedRecipeData);
        setSavedRecipes(savedRecipesArray);
        console.log('Saved recipe data ----------', savedRecipes);
      }
    } catch (error) {
      console.error('Error fetching saved recipes:', error);
    }
  };

  useEffect(() => {
    // Fetch saved recipes from AsyncStorage
    fetchSavedRecipes();
  }, []);

  const deleteItem = async title => {
    // Filter out the item with the specified id
    const updatedRecipes = savedRecipes.filter(recipe => recipe.title !== title);

    try {
      // Save the updated recipes to AsyncStorage
      await AsyncStorage.setItem(
        'savedRecipes',
        JSON.stringify(updatedRecipes),
      );
      // Update the state to re-render the component
      setSavedRecipes(updatedRecipes);
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const renderItem = ({item}) => (
    <View
      style={{padding: 16, borderBottomWidth: 1, borderBottomColor: '#ccc'}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Image
          source={{uri: item.image}}
          style={{width: 140, height: 100, borderRadius: 10}}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            marginTop: 8,
            flex: 1,
            padding: 12,
            color: '#000',
          }}>
          {item.title}
        </Text>
      </View>
      <TouchableOpacity
        style={{alignItems: 'flex-end'}}
        onPress={() => deleteItem(item.title)}>
        <Image
          source={require('../asset/Images/delete.png')}
          style={{height: 30, width: 30}}
        />
      </TouchableOpacity>
    </View>
  );

  const keyExtractor = (item, index) => {
    return item?.id?.toString() || index.toString();
  };

  return (
    <View style={{flex: 1}}>
      {savedRecipes.length === 0 ? (
        <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
        <Text style={{fontSize:20,fontWeight: 'bold', color:'#000'}}>No saved Dishes yet.</Text>
        </View>
      ) : (
        <FlatList
          data={savedRecipes}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      )}
    </View>
  );
};

export default Favourite;
