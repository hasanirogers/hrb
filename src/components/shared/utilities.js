export const formatDate = (timestamp) => {
  const postdate = new Date(timestamp * 1000);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const month = months[postdate.getMonth()];
  const day = postdate.getUTCDay();
  const year = postdate.getUTCFullYear();

  return `${month} ${day}, ${year}`;
};
