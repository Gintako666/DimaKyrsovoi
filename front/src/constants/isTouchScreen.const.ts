import isBrowser from './isBrowser.const';

const isTouchScreen = isBrowser && ('ontouchstart' in window || navigator.maxTouchPoints > 0);

export default isTouchScreen;
