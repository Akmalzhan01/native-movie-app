import { Text, View, Button } from 'react-native';

export default function Home({navigation}) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-500">
      <Text>Hello react native</Text>
      <Button title="go to detail" onPress={() => navigation.navigate("Detailes")} />
    </View>
  )
}
