import axios from 'axios';
import { getDownloadURL, listAll, ref } from 'firebase/storage';
import storage from '../../utils/firebase';
import { GetPhotosProps, UsePhotosResults } from './types';

export const usePhotos = (): UsePhotosResults => {
  const FIREBASE_ROOT = process.env.REACT_FIREBASE_ROOT ?? 'test';

  const getPhotos = async (props: GetPhotosProps): Promise<string[]> => {
    const photoUrls: string[] = [];
    if (props.googleId !== undefined) {
      const storageRef = ref(
        storage,
        `/${FIREBASE_ROOT}/${String(props.googleId)}`
      );
      await listAll(storageRef)
        .then(async (res) => {
          for (const itemRef of res.items) {
            await getDownloadURL(itemRef).then((url) => photoUrls.push(url));
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return photoUrls;
  };

  return {
    getPhotos
  };
};
