import React from "react";

export function enterLine(
  string: string,
  enterString?: string,
  numbering?: boolean,
  dubbleLine?: boolean
) {
  const splitArray = string.split(enterString || "\n");
  return splitArray.map((line, i) => (
    <>
      {numbering ? `${i + 1}. ${line}` : line}
      {splitArray.length !== i + 1 && dubbleLine ? (
        <>
          <br />
          <br />
        </>
      ) : (
        <br />
      )}
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
