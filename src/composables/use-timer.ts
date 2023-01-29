import { writable, type Writable } from "svelte/store";

// eslint-disable-next-line @typescript-eslint/no-empty-function
const noop = () => {}
const DEFAULT_INTERVAL = 1000;

export interface Timer<T> {
  start: () => void,
  restart: () => void,
  reset: () => void,
  elapsedTime: Writable<T>
}

export const useTimer = (startTime: number, callback = noop): Timer<number> => {
  let intervalId: ReturnType<typeof setInterval> | null = null;
  let elapsedTime = startTime;

  const timerStore = writable(startTime);
  timerStore.subscribe((value) => {
    elapsedTime = value;
  });

  const start = () => {
    intervalId = setInterval(() => {
      timerStore.update(value => value - 1)

      if (elapsedTime === 0) {
        reset();
        callback();
      }
    }, DEFAULT_INTERVAL);
  }

  const reset = () => {
    if (intervalId)
      clearInterval(intervalId);

    timerStore.set(startTime);
  }

  const restart = () => {
    reset();
    start();
  }

  return {
    start,
    restart,
    reset,
    elapsedTime: timerStore,
  }
}
