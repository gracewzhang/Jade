import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { HiOutlinePlus, HiOutlineXCircle } from 'react-icons/hi2';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTask
} from 'firebase/storage';
import { Line } from 'rc-progress';

import Block from '../../../components/Block';
import colors from '../../../utils/colors';
import storage from '../../../utils/firebase';
import { useAuthContext } from '../../../contexts/auth/AuthContext';
import { PhotoProps, PhotosProps } from './types';

const PhotosContainer = styled(Block)`
  position: relative;
  display: flex;
  flex-direction: row;

  > div + div > div {
    border-left: 1px dashed ${colors['light-grey']};
  }
`;

const PhotoContainer = styled.div`
  position: relative;
  width: 12.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledDropzone = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`;

const StyledPlusIcon = styled(HiOutlinePlus)`
  color: ${colors.rose};
  width: 40px;
  height: 40px;
  stroke-width: 3px;
`;

const Progress = styled(Line)`
  margin-left: 20%;
  margin-right: 20%;
`;

const StyledXIcon = styled(HiOutlineXCircle)`
  display: none;
  position: absolute;
  top: 10px;
  right: 10px;

  width: 25px;
  height: 25px;
  color: ${colors['light-grey']};

  :hover {
    cursor: pointer;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ImgContainer = styled.div`
  display: contents;
  position: relative;

  :hover {
    svg {
      display: block;
    }
  }
`;

const Photo = (props: PhotoProps): React.ReactElement => {
  const { idx, googleId, date, photos, updateDay } = props;
  const [src, setSrc] = useState(photos[idx]);

  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const uploadRef = useRef<UploadTask>();

  useEffect(() => {
    return () => {
      if (uploadRef.current !== undefined) {
        uploadRef.current.cancel();
      }
    };
  }, []);

  const handleUpload = (files: File[]): void => {
    if (googleId === undefined) return;

    const file = files[0];
    const storageRef = ref(
      storage,
      `/${googleId}/${date}-${String(idx)}.${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadRef.current = uploadTask;
    setUploading(true);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => console.log(error),
      () => {
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        getDownloadURL(uploadTask.snapshot.ref).then(handleUploadFinish);
      }
    );
  };

  const handleUploadFinish = async (url: string): Promise<void> => {
    setSrc(url);
    const newPhotos = photos.map((photo, key) => {
      if (key === idx) return url;
      return photo;
    });
    await updateDay({ photos: newPhotos });
    uploadRef.current = undefined;
    setUploading(false);
  };

  const handleDelete = async (): Promise<void> => {
    const storageRef = ref(storage, photos[idx]);
    await deleteObject(storageRef).then(async () => {
      const newPhotos = photos.map((photo, key) => {
        if (key === idx) return '';
        return photo;
      });
      await updateDay({ photos: newPhotos });
      setSrc('');
    });
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpeg', '.jpg', '.jfif', '.pjpeg', '.pjp'],
      'image/svg': ['.svg']
    },
    onDrop: handleUpload,
    maxFiles: 1
  });

  return (
    <PhotoContainer>
      {uploading ? (
        <Progress
          percent={progress}
          strokeWidth={4}
          trailWidth={4}
          strokeColor={colors.rose}
          trailColor={colors['light-grey']}
        />
      ) : src === '' ? (
        <StyledDropzone {...getRootProps()}>
          <input {...getInputProps()} />
          <StyledPlusIcon />
        </StyledDropzone>
      ) : (
        <ImgContainer>
          <StyledImg src={src} />
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <StyledXIcon onClick={handleDelete} />
        </ImgContainer>
      )}
    </PhotoContainer>
  );
};

const Photos = (props: PhotosProps): React.ReactElement => {
  const { user } = useAuthContext();
  const { date, photos, updateDay } = props;

  return (
    <PhotosContainer>
      {[0, 1, 2, 3].map((e) => (
        <Photo
          key={e}
          idx={e}
          googleId={user?.google_id}
          date={date}
          photos={photos}
          updateDay={updateDay}
        />
      ))}
    </PhotosContainer>
  );
};

export default Photos;
