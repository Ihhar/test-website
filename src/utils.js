import { isTablet, isMobile } from 'react-device-detect';

export const setDeviceScroll = () => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');
  const isTabletWidth = window.innerWidth >= 768;

  if (isTablet && isTabletWidth) {
    html.classList.add('horizontal-scroll');
    body.classList.add('horizontal-scroll');
  }

  if (isMobile) {
    html.classList.add('vertical-scroll');
    body.classList.add('vertical-scroll');
  }
};

export const portableDevice = () => {
  return isMobile || isTablet;
};

export const lockScrolling = (scroll) => {
  const html = document.querySelector('html');
  const body = document.querySelector('body');

  if (scroll) {
    html.classList.add('vertical-scroll-lock');
    body.classList.add('vertical-scroll-lock');
  } else {
    html.classList.remove('vertical-scroll-lock');
    body.classList.remove('vertical-scroll-lock');
  }
};
