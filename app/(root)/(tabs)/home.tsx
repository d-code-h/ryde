import { SignedIn, useUser, useAuth } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { SafeAreaView, Text, TouchableOpacity } from 'react-native';

const Home = () => {
  const { user } = useUser();
  const { signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    router.push('/(auth)/sign-in');
  };
  return (
    <SafeAreaView>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>

      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Home;
