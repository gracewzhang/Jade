import React from 'react';

import Entry from '../components/Entry';
import Thoughts from '../components/Thoughts';

const Home = (): React.ReactElement => {
  // const formatDate = (date: Date): string => {
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();

  //   return `${year}-${month}-${day}`;
  // };
  // const [date, setDate] = useState(() => formatDate(new Date()));
  // const [entry, setEntry] = useState({});

  return (
    <>
      <Entry/>
      <Thoughts/>
    </>
  );
};

export default Home;
