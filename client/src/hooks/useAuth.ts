import axios from 'axios';
import { useState } from 'react';
import { NewUser } from '../models/user';
import { UseAuthReturn } from '../models/auth';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const useAuth = (): any => {
  const [user, setUser] = useState(null);

  const signIn = async (data: NewUser): Promise<void> => {
    try {
      const authresult = await axios.get(`${BASE_URL}/user/${data.google_id}`); // TODO: should be get request by google id
      const userObj = { ...authresult.data?.foundUser };
      userObj.token = authresult.data?.encodedToken;
      setUser(userObj);
      // toastsuccess('Login Successfull'); // TODO
    } catch (err) {
      console.error(err);
      // toasterror('Login Failed'); // TODO
    }
  };

  const signUp = async (data: NewUser): Promise<void> => {
    try {
      const authResult = await axios.post(`${BASE_URL}/user`, data);
      const newUser = authResult?.data.result;
      setUser(newUser);
      // toastsuccess('Sign Up Successfull'); // TODO
    } catch (error) {
      console.error(error);
      // toasterror('An Error Occuered'); // TODO
    }
  };

  const signOut = (): void => {
    setUser(null);
  };

  return { user, signIn, signUp, signOut };
};
