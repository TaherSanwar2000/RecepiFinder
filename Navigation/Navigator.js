import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Home from '../Src/Home';
import Detail from '../Src/Detail';
import Favourite from '../Src/Favourite';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown:false}}>
      <Stack.Screen name="MyHome" component={MyTabs} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Favourite" component={Favourite} />
    </Tab.Navigator>
  );
}
export default MyStack;
