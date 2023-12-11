import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';
import { View, ScrollView, TouchableOpacity } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Movie() {
const [isFavorite, setIsFavorite] = useState(false)

  const navigation = useNavigation()
  const {params: item} = useRoute()
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-slate-900">
      <View className="w-full">
        <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color={"#fff"} strokeWidth={2.5} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(prev => !prev)}>
            <HeartIcon color={isFavorite ? "red" : "white"} strokeWidth={2.5} size={35} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </ScrollView>
  )
}
