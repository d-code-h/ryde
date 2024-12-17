import CustomButton from '@/components/CustomButton';
import { onboarding } from '@/constants';
import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';

const Home = () => {
  // States
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Check when slider is on last slide
  const isLastSlide = activeIndex === onboarding.length - 1;

  return (
    <SafeAreaView className="flex h-full items-center justify-between bg-white">
      {/* Top right Skip button */}
      <TouchableOpacity
        onPress={() => router.replace('/(auth)/sign-up')}
        className="w-fit ml-auto flex justify-end items-end p-5"
      >
        <Text className="text-black text-md font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper  */}
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#E2E8F0] rounded-full" />
        }
        activeDot={
          <View className="w-[32px] h-[4px] mx-1 bg-[#0286FF] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          // Each slider with an image and descriptino
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
                {item.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>

      {/* Swiper contoller button */}
      <CustomButton
        title={isLastSlide ? 'Get Started' : 'Next'}
        onPress={() =>
          isLastSlide
            ? router.replace('/(auth)/sign-up')
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-10 mb-5"
      />
    </SafeAreaView>
  );
};

export default Home;
