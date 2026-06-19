import { useEffect } from 'react';

/**
 * Like useEffect, but provides an AbortSignal for cleanup of fetch/async work.
 * RTK Query handles abort automatically — this is for non-RTK async side effects.
 *
 * @param {(signal: AbortSignal) => void | (() => void)} effect
 * @param {any[]} deps
 */
export function useAbortableEffect(effect, deps) {
  useEffect(() => {
    const controller = new AbortController();
    const cleanup = effect(controller.signal);
    return () => {
      controller.abort();
      if (typeof cleanup === 'function') cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
