const apiClient = {
  getHomes: () => {
    return fetch(
      'https://run.mocky.io/v3/62de12a6-dce1-4b9c-a34c-c77e275df98a',
    ).then((res) => {
      return res.json();
    });
  },
  bookHome: (home, checkIn, checkOut) => {
    return fetch(
      `https://run.mocky.io/v3/cd5207b5-339e-4d0a-b3b4-58d36f77a308`,
    ).then((res) => res.json());
  },
};

export default apiClient;
