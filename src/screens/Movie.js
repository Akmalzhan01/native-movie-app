import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieCredits, fetchMovieDetail, fetchMovieSimilar, image500 } from '../api';
import Loader from "../components/Loader"
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get("window")

export default function Movie() {
  const [isFavorite, setIsFavorite] = useState(false)
  const [movie, setMovie] = useState([])
  const [cast, setCast] = useState([])
  const [similar, setSimilar] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const navigation = useNavigation()
  const { params: id } = useRoute()

  useEffect(() => {
    getMovieDetail()
    getMovieCredits()
    getMovieSimilar()
  }, [id])

  const getMovieDetail = async () => {
    const data = await fetchMovieDetail(id);
    setMovie(data)
    setIsLoading(false)
    console.log("Movie Details", data);
  }

  const getMovieCredits = async () => {
    const data = await fetchMovieCredits(id);
    setCast(data.cast)
    console.log("Movie Credits", data);
  }

  const getMovieSimilar = async () => {
    const data = await fetchMovieSimilar(id);
    setSimilar(similar.results)
    console.log("Movie Similar", data);
  }


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-slate-900">
      <View className="w-full">
        <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-4">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color={"#fff"} strokeWidth={2.5} size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFavorite(prev => !prev)}>
            <HeartIcon color={isFavorite ? "red" : "white"} strokeWidth={2.5} size={35} />
          </TouchableOpacity>
        </SafeAreaView>
        {isLoading ? (
          <Loader />
        ) : (
          <View>
            <Image source={{ uri: image500(movie.poster_path) }}
              style={{ width, height: height * 0.5 }} />
              <LinearGradient 
              colors={[
                "transparent",
                "rgba(23,23,23, 0.8)",
                "rgba(23,23,23, 1)",
              ]} 
              style={{width, height: height * 0.4}}
              start={{x: 0.5, y: 0}}
              end={{x: 0.5, y: 1}}
              className="absolute bottom-0" />
          </View>
        )}
      </View>
    </ScrollView>
  )
}
