let $body = <HTMLBodyElement>document.querySelector('body');
let scrollPosition = 0;

export const enable = () => {
  console.log('this got hit');
  scrollPosition = window.pageYOffset;
  $body.style.overflow = 'hidden';
  $body.style.position = 'fixed';
  $body.style.top = `-${scrollPosition}px`;
  $body.style.width = '100%';
};

export const disable = () => {
  console.log('this got taken down');
  $body.style.removeProperty('overflow');
  $body.style.removeProperty('position');
  $body.style.removeProperty('top');
  $body.style.removeProperty('width');
  window.scrollTo(0, scrollPosition);
};