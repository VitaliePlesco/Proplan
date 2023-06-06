import React from "react";

export const randomRgb = () => {
  const randomArr = [];
  for (let i = 0; i < 3; i++) {
    randomArr.push(Math.floor(Math.random() * 25) * 10);
  }
  // let hex = `${randomArr[0].toString(16)}${randomArr[1].toString(
  //   16
  // )}${randomArr[2].toString(16)}`;
  let hex = `rgb(${randomArr[0]}, ${randomArr[1]}, ${randomArr[2]})`;
  return hex;
};
