import { useState } from 'react';

/**
 * example
 * TODO: 삭제
 * */ 
export const AboutDetailLazy = () => {
  const [isError, setIsError] = useState(false);

  return (
    <>
      <h1>About Detail Lazy</h1>
      <p>About Detail Lazy 컴포넌트</p>
      <button onClick={() => setIsError((prev) => !prev)}>에러 발생</button>

      {isError && <ThrowError />}
    </>
  );
};

const ThrowError = () => {
  throw new Error('About Detail Lazy 컴포넌트에서 에러 발생');
};
