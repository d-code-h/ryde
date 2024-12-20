import CustomButton from '@/components/CustomButton';
import InputField from '@/components/InputField';
import OAuth from '@/components/OAuth';
import { fields, icons, images } from '@/constants';
import { fetchAPI } from '@/lib/fetch';
import { CustomError, SignInFormKeys, SignUpFormKeys } from '@/types/type';
import { useSignUp } from '@clerk/clerk-expo';
import { Link, router } from 'expo-router';
import { useState } from 'react';
import { View, Text, ScrollView, Image, Alert } from 'react-native';
import { ReactNativeModal } from 'react-native-modal';

const SignUp = () => {
  // States
  const [showSuccessModal, setSuccessModal] = useState(false);
  const [form, setForm] = useState<Record<SignUpFormKeys, string>>({
    name: '',
    email: '',
    password: '',
  });

  const [verification, setVerification] = useState({
    state: 'default',
    error: '',
    code: '',
  });

  const { isLoaded, signUp, setActive } = useSignUp();

  // Handle Sign-in form submission
  const onSignUpPress = async () => {
    if (!isLoaded) return;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: 'pending',
      });
    } catch (err) {
      const customError = err as CustomError;
      console.error(JSON.stringify(err, null, 2));
      Alert.alert('Error', customError.errors[0].message);
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        // Store user credentials to DB
        await fetchAPI('/(api)/user', {
          method: 'POST',
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });

        setVerification({
          ...verification,
          state: 'success',
        });
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        setVerification({
          ...verification,
          error: 'Verification failed. Please try again',
          state: 'failed',
        });
      }
    } catch (err) {
      const customError = err as CustomError;

      setVerification({
        ...verification,
        error: customError.errors[0].message,
        state: 'failed',
      });
    }
  };

  return (
    // Handle proper strolling functionality
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        {/* An hero image */}
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>

        <View className="p-5">
          {/* Render each form field */}
          {fields.map(({ label, placeholder, icon, textContentType }) => (
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

          {/* Show OTP modal on Submit */}
          <CustomButton
            title="Sign Up"
            className="mt-6"
            onPress={onSignUpPress}
          />

          {/* Sign in using Google account */}
          <OAuth />

          {/* Go to sign-in page if no account yet */}
          <Link
            href="/(auth)/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{' '}
            <Text className="text-primary-500">Log In</Text>
          </Link>
        </View>

        {/* OTP verification modal */}
        <ReactNativeModal
          isVisible={verification.state === 'pending'}
          onModalHide={() => {
            if (verification.state === 'success') {
              setSuccessModal(true);
            }
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="font-JakartaExtraBold text-2xl mb-2">
              Verification
            </Text>
            <Text className="font-Jakarta mb-5">
              We have sent a verification code to {form.email}
            </Text>
            <InputField
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({
                  ...verification,
                  code: code,
                })
              }
            />

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title="Verify Email"
              onPress={onVerifyPress}
              className="bg-success-500 mt-5"
            />
          </View>
        </ReactNativeModal>

        {/* Success message verification modal */}
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
            />
            <Text className="text-3xl font-JakartaBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center mt-2">
              You have successfully verified your account
            </Text>

            <CustomButton
              title="Browse Home"
              onPress={() => router.push('/(root)/(tabs)/home')}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
