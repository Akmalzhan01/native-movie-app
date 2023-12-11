import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { image185 } from '../api'
import { useNavigation } from '@react-navigation/native'


export default function Cast({ cast }) {
  const navigation = useNavigation()
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 my-5">Actors</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}>
        {cast && cast.map((person, idx) => (
          <TouchableOpacity
            key={idx}
            className="mr-4 items-center mb-6"
            onPress={() => navigation.navigate("Person", person.id)
            }
          >
            <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
              <Image className="rounded-2xl h-24 w-20" source={{ uri: image185(person?.profile_path) }} />
            </View>
            <Text className="text-white text-xs mt-1">{person?.character.length > 10
              ? person.character.slice(0, 10) + "..."
              : person?.character}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}
