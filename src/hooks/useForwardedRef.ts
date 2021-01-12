/* eslint-disable no-param-reassign */
import { useEffect, useRef } from "react";

export default function useForwardedRef<T>(ref: any) {
  const innerRef = useRef<T>(null);
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === "function") {
      ref(innerRef.current);
    } else {
      ref.current = innerRef.current;
    }
  });

  return innerRef;
}
