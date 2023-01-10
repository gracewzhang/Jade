export interface LogoutModalProps {
  isVisible: boolean;
  setIsVisible: (newIsVisible: boolean) => void;
  setIsLoggedIn: (newIsLoggedIn: boolean) => void;
}

export interface SignoutButtonProps {
  primaryColor: string;
  darkPrimaryColor: string;
}
