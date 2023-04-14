import { EffectCallback, useEffect } from 'react';

export const useDelayedEffect = (
  effect: EffectCallback,
  deps: React.DependencyList,
  timeout = 1000,
) => {
  useEffect(() => {
    const timeoutId = setTimeout(effect, timeout);

    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
