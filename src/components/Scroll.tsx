import useForwardedRef from "hooks/useForwardedRef";
import React, { createRef, useEffect, useState, forwardRef } from "react";

type Props = {
  className?: string;
  id?: string;
  children: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
  isFetching?: boolean;
  callback?: () => void;
  onScroll?: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void;
};

export default forwardRef<HTMLDivElement, Props>(
  (
    { className, children, style, callback, isFetching, onScroll, id }: Props,
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
        className={`overflow-hidden overflow-y-auto ${className || ""}`}
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
