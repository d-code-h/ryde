import { useAuth } from '@clerk/clerk-expo';
import { Redirect } from 'expo-router';

export default function Index() {
  // Get login info from clerk
  const { isSignedIn } = useAuth();

  // Redirect to onboarding screen if not sign in
  if (!isSignedIn) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Redirect home if a user is logged in
  return <Redirect href="/(root)/(tabs)/home" />;
}
