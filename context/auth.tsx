import React, { useEffect, useState } from 'react';
import { useSegments, useRouter, useFocusEffect } from 'expo-router';
import { Alert } from 'react-native';

const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return React.useContext(AuthContext);
}

export function AuthProvider({ children }: React.PropsWithChildren) {
  const [user, setUser] = useState<string | undefined>('i');
  const [userInfo, setUserInfo] = useState<any | undefined>(null);
  const [rememberMe, setRememberMe] = useState(false); // Remember me state

  const rootSegment = useSegments()[0];
  const router = useRouter();

  // // Uygulama başlatıldığında token kontrolü yap
  // useEffect(() => {
  //   const checkUserToken = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem('userToken');
  //       const storedUserInfo = await AsyncStorage.getItem('userInfo');
  //       if (storedToken) {
  //         setUser(storedToken);
  //       }
  //       if (storedUserInfo) {
  //         setUserInfo(JSON.parse(storedUserInfo));
  //       }
  //     } catch (error) {
  //       console.error('Error loading token or user info:', error);
  //     }
  //   };
  //   checkUserToken();
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (user === undefined) {
        return;
      }

      // Kullanıcı giriş yapmamışsa (login veya register hariç) register'a yönlendir
      if (!user && rootSegment !== 'register' && rootSegment !== 'login') {
        router.replace('/login');
      }

      // Kullanıcı giriş yapmışsa ve tabs dışında bir sayfadaysa ana sayfaya yönlendir
      if (user && rootSegment !== '(tabs)') {
        router.replace('/');
      }
    }, [user, rootSegment])
  );

  // const signIn = async (email: string, password: string) => {
  //   try {
  //     const response = await fetch('https://server-piller.cosmostest.tech/auth/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ email, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log(data.body.user.isActive)

  //       if (data.body.user.isActive === false) {
  //         // Kullanıcı aktif değilse doğrulama sayfasına yönlendir
  //         // router.push({
  //         //   pathname: '/verify',
  //         //   params: { email },
  //         // });
  //       } else {
  //         setUser(data.body.token); // Sunucudan dönen kullanıcı tokenını kaydet
  //         setUserInfo(data.body.user); // Sunucudan dönen kullanıcı bilgilerini kaydet
  //         await AsyncStorage.setItem('userInfo', JSON.stringify(data.body.user)); // Kullanıcı bilgilerini AsyncStorage'a kaydet

  //         if (rememberMe) {
  //           await AsyncStorage.setItem('userToken', data.body.token); // Kullanıcı tokenını AsyncStorage'a kaydet
  //         }

  //         router.replace("/");
  //       }
  //     } else {
  //       // Giriş başarısız, hata mesajını göster
  //       const errorData = await response.json();
  //        if( errorData.body.user.isActive == false ){

  //           const response = await fetch(`https://server-piller.cosmostest.tech/auth/re-send-activation?email=${email}`, {
  //             method: 'GET',
  //           });

  //           router.push({
  //             pathname: '/registerVerify',
  //             params: { email },
  //           });
  //       }
  //       console.error("Login failed:", errorData.message , );
  //       console.log(errorData.body.user)
  //       console.error("Login failed:", errorData.user , );
  //     }
  //   } catch (error) {
  //     console.error("Login error:", error);
  //   }
  // };

  // const signUp = async (firstName: string, lastName: string, telephoneNumber: string, email: string, password: string) => {
  //   try {
  //     const response = await fetch('https://server-piller.cosmostest.tech/auth/register', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ firstName, lastName, telephoneNumber, email, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       // Kayıt başarılı, kullanıcıyı giriş sayfasına yönlendirebilirsiniz
  //       router.replace("/(auth)/login");
  //     } else {
  //       // Kayıt başarısız, hata mesajını göster
  //       const errorData = await response.json();
  //       console.error("Registration failed:", errorData.message);
  //     }
  //   } catch (error) {
  //     console.error("Registration error:", error);
  //   }
  // };

  const signOut = async () => {
    setUser('');
    setUserInfo(null);
    // await AsyncStorage.removeItem('userToken'); // Kullanıcı tokenını sil
    // await AsyncStorage.removeItem('userInfo'); // Kullanıcı bilgilerini sil
    router.replace('/login');
  };

  const value = {
    rememberMe,
    user,
    userInfo,
    // signIn,
    // signUp,
    signOut,
    setRememberMe,
    setUserInfo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
