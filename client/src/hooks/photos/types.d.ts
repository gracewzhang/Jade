export interface UsePhotosResults {
  getPhotos: (props: GetPhotosProps) => Promise<string[]>;
}

export interface GetPhotosProps {
  googleId: string | undefined;
}
