import React from 'react';

interface MagicProps {
  children: any;
}
const Magic = ({children}:MagicProps) => {
  return (
    <>
      Magic
      {children}
    </>
  )
};

export default Magic;