import ReactLoading from 'react-loading';

const BaseLoader = ({ type, color, height, width }: any) => (
  <ReactLoading type={type} color={color} height={height} width={width} />
);

export const CylonLoader = ({ color, height, width }: any) => (
    <BaseLoader type={'cylon'} color={color} height={height} width={width} />
);