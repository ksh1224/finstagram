import { useEffect } from "react";

export default function useScrollTop(value: any, onScroll: (e: any) => void) {
  useEffect(() => {
    function handleScroll(event: any) {
      if (event) {
        // eslint-disable-next-line no-param-reassign
        onScroll(document.documentElement);
      }
    }

    // Bind the event listener
    document.addEventListener("scroll", handleScroll);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("scroll", handleScroll);
    };
  }, [value]);
}
