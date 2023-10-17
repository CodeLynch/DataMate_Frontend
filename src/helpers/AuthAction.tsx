export const loginSuccess = (userId: string) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: userId,
  };
};


export const loginFailure = (error:any) => {
  return {
    type: 'LOGIN_FAILURE',
    payload: error,
  };
};

export const logout = () => {
  localStorage.removeItem('userData');
  return {
    type: 'LOGOUT',
  };
};

// export const UPDATE_USER_PROFILE = 'UPDATE_USER_PROFILE';

// export const updateUserProfile = (updatedUserData:any) => {
//   return {
//     type: UPDATE_USER_PROFILE,
//     payload: updatedUserData,
//   };
// };
