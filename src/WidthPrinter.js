import React from 'react';
import useWindowWidth from './useWindowWidth.js';

export default function WidthPrinter() {
  const width = useWindowWidth();
  return <div>{`width is ${width}`}</div>
}