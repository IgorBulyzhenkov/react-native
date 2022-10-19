import { auth } from "../../../config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserProfile, authSignOut, authStateChange } = authSlice.actions;

export const authSinInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);

      return user;
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }; // вхід

export const authSinUpUser =
  ({ login, email, password }) =>
  async (dispatch, getState) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await updateProfile(auth.currentUser, {
        displayName: login,
      });

      const user = await auth.currentUser;

      const userUpdate = {
        email: user.email,
        userId: user.uid,
        nickName: user.displayName,
      };
      dispatch(updateUserProfile(userUpdate));
    } catch (error) {
      console.log("error", error);
      console.log("error.message", error.message);
    }
  }; // реєстрація
export const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth)
      .then(() => {
        dispatch(authSignOut());
      })
      .catch((error) => {
        console.log(error.message);
      });
  } catch (error) {
    console.log(error.message);
  }
}; // вихід

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (!user) {
        return;
      }
      const userUpdate = {
        email: user.email,
        userId: user.uid,
        nickName: user.displayName,
      };
      dispatch(updateUserProfile(userUpdate));
      dispatch(authStateChange({ stateChange: true }));
    });
  } catch (error) {
    console.log(error.message);
  }
};
