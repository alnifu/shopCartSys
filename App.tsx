import { Text, View, Image, ScrollView, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { styles } from './src/styles/globalStyles';
import AppNavigator from './src/navigation/AppNavigator';
import { GroceryProvider } from './src/contexts/GroceryContext';

export default function App() {
  return (
    <GroceryProvider>
      <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight, paddingBottom: 6 }}>
        <AppNavigator />
      </SafeAreaView>
    </GroceryProvider>

  );
}