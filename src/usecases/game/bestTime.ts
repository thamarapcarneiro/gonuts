const useBestTime = () => ({
  set: (time: number) => {
    localStorage.setItem("bestTime", time.toString());
  },
  get: () => localStorage.getItem("bestTime") || null
});

export { useBestTime };
