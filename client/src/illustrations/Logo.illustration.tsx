import React from 'react';
import { Style } from '../models/style';

export const LogoIllustration = (props: Style): JSX.Element => {
  const { className } = props;
  return (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M29.7876 54.1593C29.7876 52.6638 31 51.4514 32.4956 51.4514H56.8672C58.3628 51.4514 59.5752 52.6638 59.5752 54.1593C59.5752 55.6549 58.3628 56.8673 56.8672 56.8673H32.4956C31 56.8673 29.7876 55.6549 29.7876 54.1593Z"
        fill="#FDBAA3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48.7434 10.5033C47.9381 10.5033 47.1657 10.8232 46.5963 11.3927L13.2771 44.7119L11.8457 50.4376L17.5713 49.0061L50.8905 15.687C51.1725 15.405 51.3961 15.0702 51.5487 14.7018C51.7013 14.3334 51.7799 13.9386 51.7799 13.5398C51.7799 13.1411 51.7013 12.7462 51.5487 12.3778C51.3961 12.0094 51.1725 11.6747 50.8905 11.3927C50.6085 11.1107 50.2738 10.8871 49.9054 10.7345C49.537 10.5819 49.1421 10.5033 48.7434 10.5033ZM42.7666 7.56306C44.3518 5.97792 46.5017 5.0874 48.7434 5.0874C49.8534 5.0874 50.9525 5.30603 51.978 5.7308C53.0035 6.15558 53.9353 6.77818 54.7202 7.56306C55.505 8.34794 56.1276 9.27973 56.5524 10.3052C56.9772 11.3307 57.1958 12.4298 57.1958 13.5398C57.1958 14.6498 56.9772 15.7489 56.5524 16.7744C56.1276 17.7999 55.505 18.7317 54.7202 19.5166L20.8706 53.3662C20.5235 53.7132 20.0887 53.9594 19.6126 54.0784L8.78069 56.7864C7.85789 57.0171 6.8817 56.7467 6.2091 56.0741C5.53649 55.4015 5.2661 54.4253 5.4968 53.5025L8.20477 42.6707C8.32381 42.1945 8.57001 41.7597 8.91706 41.4126L42.7666 7.56306Z"
        fill="#1B1F23"
      />
    </svg>
  );
};
