import { ResizeObserver } from "@juggle/resize-observer";

/*
const debounce = (callback: Function, delay: number) => {
  let tid: any
  return function () {
      const ctx = self
      tid && clearTimeout(tid);
      tid = setTimeout(() => {
          callback.apply(ctx, arguments)
      }, delay)
  }
}

*/

export const GlobalResizeObserver = (function () {
  const ATTR_NAME = "global-resizeobserver-key";

  const attrValueToCallback: any = {};

  const o = new ResizeObserver((entries: any) => {
    for (const entry of entries) {
      const resizedElement = entry.target;
      const attrValue = resizedElement.getAttribute(ATTR_NAME);
      if (attrValue) {
        const callback = attrValueToCallback[attrValue];
        if (typeof callback === "function") {
          callback(entry);
          //window.requestAnimationFrame((): void | undefined => {
          // // callback(entry);
          //});
        }
      }
    }
  });

  return Object.freeze({
    /**
     * @param { Element } element
     * @param { (ResizeObserverEntry) => {} } callback
     */
    observe(element: Element, callback: any) {
      if (!(element instanceof Element)) {
        console.error("GlobalResizeObserver, cannot observe non-Element.");
        return;
      }

      let attrValue = element.getAttribute(ATTR_NAME);
      if (!attrValue) {
        attrValue = String(Math.random());
        element.setAttribute(ATTR_NAME, attrValue);
      }

      attrValueToCallback[attrValue] = callback;
      o.observe(element);
    },

    /**
     * @param { Element } element
     */
    unobserve(element: Element) {
      if (!(element instanceof Element)) {
        console.error("GlobalResizeObserver cannot unobserve non-Element.");
        return;
      }
      const attrValue = element.getAttribute(ATTR_NAME);
      if (!attrValue) {
        console.error(
          "GlobalResizeObserver cannot unobserve element w/o ATTR_NAME."
        );
        return;
      }
      delete attrValueToCallback[attrValue];
      o.unobserve(element);
    },
  });
})();
