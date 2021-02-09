import { DependencyList, useEffect } from "react";

export default function useScrollEnd(
  scrollEnd: (e: boolean) => void,
  deps?: DependencyList
) {
  // value: any, onScroll: (e: any) => void
  useEffect(() => {
    function handleScroll(event: any) {
      if (event) {
        // eslint-disable-next-line no-param-reassign
        const element = document.getElementById("finsta_body");
        if (element && scrollEnd)
          scrollEnd(
            window.scrollY + element.clientHeight === element.scrollHeight
          );
      }
    }

    // Bind the event listener
    document.addEventListener("scroll", handleScroll);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("scroll", handleScroll);
    };
  }, [deps]);
}
