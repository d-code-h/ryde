import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const Layout = () => {
  return (
    // Auth routers
    <>
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="on-board" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
      </Stack>

      <StatusBar style="dark" />
    </>
  );
};

export default Layout;
