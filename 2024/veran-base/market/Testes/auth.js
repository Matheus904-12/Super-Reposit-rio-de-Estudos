import auth from '@react-native-firebase/auth';

export const signIn = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    return false;
  }
};

export const signUp = async (email, password) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    return true;
  } catch (error) {
    console.error('Erro ao cadastrar:', error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await auth().signOut();
    return true;
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
    return false;
  }
};
