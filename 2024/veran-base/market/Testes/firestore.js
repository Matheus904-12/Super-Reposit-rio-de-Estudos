import firestore from '@react-native-firebase/firestore';

export const saveUserData = async (userId, userData) => {
  try {
    await firestore().collection('users').doc(userId).set(userData);
    return true;
  } catch (error) {
    console.error('Erro ao salvar dados do usuário:', error);
    return false;
  }
};
