import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { View, ScrollView, TouchableOpacity, Dimensions, Image, Text } from 'react-native';
import { ChevronLeftIcon } from "react-native-heroicons/outline"
import { HeartIcon } from "react-native-heroicons/solid"
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchMovieCredits, fetchMovieDetail, fetchMovieSimilar, image500 } from '../api';
import Loader from "../components/Loader"
import { LinearGradient } from 'expo-linear-gradient';
import Cast from "../components/cast"
import UpComingMovie from '../components/up-coming-movie';

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
    setSimilar(data.results)
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
              style={{ width, height: height * 0.4 }}
              start={{ x: 0.5, y: 0 }}
              end={{ x: 0.5, y: 1 }}
              className="absolute bottom-0" />
          </View>
        )}
        <View className="space-y-4" style={{ marginTop: -40 }}>
          <Text className="text-white text-center text-3xl font-bold tracking-widest">{movie?.title}</Text>
          {movie?.id && (
            <Text className="text-neutral-400 font-semibold text-base text-center">
              {movie?.status} •
              {movie?.release_date?.split("-")[0]} • {" "}
              {movie?.runtime} min
            </Text>
          )}
          <View className="flex-row justify-center items-center mx-4 space-x-2">
            {movie?.genres?.map((genre, idx) => (
              <Text key={idx} className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name} {" "}
                {idx + 1 !== movie.genres.length ? "•" : null}
              </Text>
            ))}
          </View>
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide mt-2">{movie?.overview}</Text>
      </View>
      {movie?.id && cast.length > 0 && <Cast cast={cast} />}
      {movie?.id && similar.length > 0 && <UpComingMovie upComing={similar} title={"Similar movies"} />}
    </ScrollView>
  )
}
