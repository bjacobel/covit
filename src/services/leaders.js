export const getLeaders = () => {  // eslint-disable-line import/prefer-default-export
  return new Promise((resolve) => {
    fetch('https://covit-ddae8.firebaseio.com/leaders.json')
      .then(response => response.json())
      .then(json => resolve(json));
  });
};
