import { Text, View, Button } from 'react-native';

export default function Detailed({navigation}) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text>Open up App.js to start working on your app!</Text>
      <Button title="go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  )
}
