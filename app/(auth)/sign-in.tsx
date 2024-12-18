import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { fields, images } from '@/constants';
import { SignInFormKeys } from '@/types/type';
import { useSignIn } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useCallback, useState } from 'react';
import { View, Text, ScrollView, Image } from 'react-native';

const SignIn = () => {
  const [form, setForm] = useState<Record<SignInFormKeys, string>>({
    email: '',
    password: '',
  });

  const { signIn, setActive, isLoaded } = useSignIn();

  // Handle the submission of the sign-in form
  const onSignInPress = useCallback(async () => {
    if (!isLoaded) return;

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace('/(root)/(tabs)/home');
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [isLoaded, form]);

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
                value={form[`${label.toLowerCase()}` as SignInFormKeys]}
                secureTextEntry={label.toLowerCase() === 'password'}
                onChangeText={(value) =>
                  setForm({ ...form, [label.toLowerCase()]: value })
                }
              />
            ))}

          <CustomButton
            title="Sign In"
            className="mt-6"
            onPress={onSignInPress}
          />

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
