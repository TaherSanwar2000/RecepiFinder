import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import SearchIcon from '../asset/Icons/SearchIcon';
import {useNavigation} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';


const Home = () => {
  const [searchItem, setSearchItem] = useState('');
  const [recipes, setRecipes] = useState([]);
  const navigation = useNavigation();
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const getDishDetail = async () => {
    const apikey = 'bcb580a772ca43c49d7fcf072d20a667';
    const URL = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apikey}`;

    try {
      const response = await fetch(`${URL}&query=${searchItem}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getDishDetail();
  }, [searchItem]);

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => navigation.navigate('Detail', {id: item.id})}>
      <Image source={{uri: item.image}} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1, padding: 12, backgroundColor:'#fff'}}>
      {isConnected ? (
        <>
          <View
            style={{
              borderWidth: 1,
              borderRadius: 30,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 15,
            }}>
            <SearchIcon />

            <TextInput
              value={searchItem}
              onChangeText={text => {
                setSearchItem(text);
              }}
              placeholder="Type here..."
            />
          </View>
          <FlatList
            data={recipes}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            numColumns={2}
          />
        </>
      ) : (
        <View style={{flex:1,alignItems:"center", justifyContent:'center'}}>
          <Image source={require('../asset/Images/NoInternet.jpg')} style={{width: 300,height:300}}/>
          <Text style={{fontSize:20, fontWeight: 'bold',color:'#000'}}>No Internet Connection</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation:5,
    backgroundColor:'#fff'
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Home;
