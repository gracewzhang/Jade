import React, { useEffect, useState } from 'react';
// import GoogleLogin from 'react-google-login';
// or maybe { GoogleLogin }
import { getDays } from '../hooks/useDay';
import { Day } from '../models/day';

const Signup = (): React.ReactElement => {
  const [days, setDays] = useState<Day[] | null>(null);

  const fetchDays = async (): Promise<any> => {
    const days = await getDays();
    setDays(days.result);
    console.log(days.result);
  };

  useEffect(() => {
    fetchDays().catch((e) => console.log(e));
  }, []);

  return (
    // <GoogleLogin
    //   clientId={`${process.env.REACT_APP_CLIENT_ID}`}
    //       onSuccess={onSuccess}
    // />
    <p>{'hello'}</p>
  );
};

export default Signup;
