const convertDate = (date) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr',
    'May', 'Jun', 'Jul', 'Aug',
    'Sep', 'Oct', 'Nov', 'Dec'];

  const day = date.getDate();

  const monthIndex = date.getMonth();
  const monthName = monthNames[monthIndex];

  const year = date.getFullYear();

  return `${day} ${monthName} ${year}`;
};

const convertTime = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();

  const format = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12; 
  hours = hours ? hours : 12;
  hours = hours < 10 ? '0' + hours : hours;
  
  minutes = minutes < 10 ? '0' + minutes : minutes;

  return `${hours}:${minutes} ${format}`;
};


export default {
  convertDate,
  convertTime
}