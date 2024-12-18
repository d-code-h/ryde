import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { fields, images } from '@/constants';
import { FormKeys } from '@/types/type';
import { Link } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const SignIn = () => {
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [form, setForm] = useState<Record<FormKeys, string>>({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Welcome 👋
          </Text>
        </View>
        <View className="p-5">
          {fields
            .slice(1)
            .map(({ label, placeholder, icon, textContentType }) => (
              <InputField
                key={label}
                label={label}
                placeholder={placeholder}
                icon={icon}
                textContentType={textContentType}
                value={form[`${label.toLowerCase()}` as FormKeys]}
                secureTextEntry={label.toLowerCase() === 'password'}
                onChangeText={(value) =>
                  setForm({ ...form, [label.toLowerCase()]: value })
                }
              />
            ))}

          <CustomButton title="Sign In" className="mt-6" />

          <OAuth />

          <Link
            href="/(auth)/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            Don't have an account?{' '}
            <Text className="text-primary-500">Sign Up</Text>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
