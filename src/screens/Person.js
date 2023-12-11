import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { fetchPersonDetail, fetchPersonMovie, image342 } from '../api'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import UpComingMovie from '../components/up-coming-movie'

const { width, height } = Dimensions.get("window")

export default function Person() {
  const [isLoading, setIsLoading] = useState(true)
  const [person, setPerson] = useState({})
  const [personaMovie, setPersonaMovie] = useState([])
  const [isFavorite, setIsFavorite] = useState(false)

  const { params: id } = useRoute()
  const navigation = useNavigation()
  useEffect(() => {
    getPersonDetail()
    getPersonMovie()
  }, [id])

  const getPersonDetail = async () => {
    const data = await fetchPersonDetail(id)
    setPerson(data)
    setIsLoading(false)
  }
  const getPersonMovie = async () => {
    const data = await fetchPersonMovie(id)
    setPersonaMovie(data.cast)
  }

  return (
    <ScrollView
      className="flex-1 bg-slate-900"
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-4">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon color={"#fff"} strokeWidth={2.5} size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavorite(prev => !prev)}>
          <HeartIcon color={isFavorite ? "red" : "white"} strokeWidth={2.5} size={35} />
        </TouchableOpacity>
      </SafeAreaView>
      {isLoading ? <Loader /> : <View>
        <View
          className="flex-row justify-center"
          style={{
            shadowColor: "gray",
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
            <Image
              source={{ uri: image342(person?.profile_path) }}
              style={{ height: height * 0.43, width: width * 0.74 }} />
          </View>
        </View>
        <View className="mt-6">
          <Text className="text-white text-3xl font-bold text-center">{person?.name}</Text>
          <Text className="text-neutral-400 text-base text-center">{person?.place_of_birth}</Text>
        </View>
        <View className="mx-3 p-4 mt-6 flex-row justify-center items-center bg-neutral-700 rounded-full">
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">
              Gender
            </Text>
            <Text className="text-neutral-400 text-sm">
              {person?.gender === 1 ? "Female" : "Male"}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">
              Birth day
            </Text>
            <Text className="text-neutral-400 text-sm">
              {person?.birthday}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">
              Known for
            </Text>
            <Text className="text-neutral-400 text-sm">
              {person?.known_for_department}
            </Text>
          </View>
          <View className="border-r-2 border-r-neutral-400 px-2 items-center">
            <Text className="text-white font-semibold">
              Popularity
            </Text>
            <Text className="text-neutral-400 text-sm">
              {person?.popularity?.toFixed(2)} %
            </Text>
          </View>
        </View>
        <View className="my-6 mx-4 space-y-2">
          <Text className="text-white text-lg">Biography</Text>
          <Text className="text-neutral-400 tracking-wide">{person?.biography}</Text>
        </View>
        {person?.id && personaMovie.length > 0 && (
          <UpComingMovie title="Movies" upComing={personaMovie} />
        )}
      </View>}
    </ScrollView>
  )
}
