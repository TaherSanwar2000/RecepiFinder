import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../Src/Home';
import Detail from '../Src/Detail';
import Favourite from '../Src/Favourite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Favourite" component={Favourite} />

    </Stack.Navigator>
  );
}
export default MyStack;
