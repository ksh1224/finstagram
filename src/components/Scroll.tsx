import useForwardedRef from "hooks/useForwardedRef";
import React, { createRef, useEffect, useState, forwardRef } from "react";

type Props = {
  className?: string;
  id?: string;
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  isFetching?: boolean;
  removeScrollY?: boolean;
  callback?: () => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

export default forwardRef<HTMLDivElement, Props>(
  (
    {
      className,
      children,
      style,
      callback,
      isFetching,
      removeScrollY,
      onScroll,
      id,
    }: Props,
    ref
  ) => {
    const safeRef = useForwardedRef<HTMLDivElement>(ref);
    const [isEnd, setIsEnd] = useState(false);

    const onScrollEnd = () => {
      if (
        safeRef.current &&
        safeRef.current.scrollTop + safeRef.current.clientHeight ===
          safeRef.current.scrollHeight
      ) {
        setIsEnd(true);
      } else {
        setIsEnd(false);
      }
    };

    useEffect(() => {
      if (callback && isEnd && !isFetching) callback();
    }, [isEnd]);

    return (
      <div
        id={id}
        className={`overflow-hidden ${removeScrollY ? "" : "overflow-y-auto"} ${
          className || ""
        }`}
        ref={safeRef}
        style={style}
        onScroll={(e) => {
          onScrollEnd();
          if (onScroll) onScroll(e);
        }}
      >
        {children}
      </div>
    );
  }
);
