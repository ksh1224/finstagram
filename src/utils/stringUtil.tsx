import React from "react";

export function enterLine(string: string) {
  const splitArray = string.split("\n");
  return splitArray.map((line, i) => (
    <>
      {line}
      {splitArray.length !== i + 1 && <br />}
    </>
  ));
}

export function tagUtil(string: string, tagName: string) {
  const textArr: any = string.split(`<${tagName}>`);
  const newArr: any[] = [];
  textArr.forEach((sliceText: any) => {
    if (sliceText.includes(`</${tagName}>`)) {
      const smallText = sliceText.split(`</${tagName}>`)[0];
      const restText = sliceText.split(`</${tagName}>`)[1];
      newArr.push(<div style={{ color: "rgb(150,150,150)" }}>{smallText}</div>);
      newArr.push(<>{restText}</>);
      return;
    }
    newArr.push(<>{sliceText}</>);
  });
  return newArr;
}
