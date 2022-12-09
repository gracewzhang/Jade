import axios, { AxiosResponse } from 'axios';
import { DayResult, Day } from '../models/day';

const BASE_URL =
  process.env.REACT_APP_VERCEL_URL !== undefined
    ? `https://${process.env.REACT_APP_VERCEL_URL}/api`
    : 'http://localhost:9000/api';

export const getDays = async (): Promise<DayResult> => {
  const requestString = `${BASE_URL}/day/`;
  return await axios.get<DayResult>(requestString, {
    headers: {
      'Content-Type': 'application/JSON'
    }
  }).then((e) => {
    return e.data;
  }).catch((error) => { throw new Error(error); });
};

/*
  const [days, setDays] = useState<Day[] | null>(null);

  const fetchDays = async (): Promise<any> => {
    const days = await getDays();
    setDays(days.result);
    console.log(days.result);
  };

  useEffect(() => {
    fetchDays().catch((e) => console.log(e));
  }, []);
*/
