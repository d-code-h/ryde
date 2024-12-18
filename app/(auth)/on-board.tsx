import CustomButton from '@/components/CustomButton';
import { images } from '@/constants';
import { Link, router } from 'expo-router';
import { View, Text, ScrollView, Image } from 'react-native';

const OnBoard = () => {
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full">
          <Image source={images.onBoard} className="z-0 w-full" />
        </View>
        <View className="flex items-center justify-center w-full mt-4 p-5">
          <Text className="text-black text-3xl font-bold mx-10 text-center">
            Let's get started
          </Text>
          <Text className="text-md font-JakartaSemiBold text-center text-[#858585] mx-10 mt-3">
            Sign up or log in to find out the best car for you
          </Text>

          <CustomButton
            title="Sign Up"
            className="mt-9"
            onPress={() => router.replace('/(auth)/sign-up')}
          />
          {/* <OAuth /> */}

          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Have an account?{' '}
            <Text className="text-primary-500 font-JakartaSemiBold">
              Log in
            </Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default OnBoard;
