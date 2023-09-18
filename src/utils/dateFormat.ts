export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} • ${hours}:${minutes}`;
};

export const formatOnlyDate = (date: string) => {
  const d = new Date(date);
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
};

export const formatTime = (date: Date) => {
  console.log('formatting time: ', date);
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

export const convertTo24Hour = (timeStr: string) => {
  const [time, period] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (period.toLowerCase() === 'pm' && hours !== 12) {
    hours += 12;
  }

  if (period.toLowerCase() === 'am' && hours === 12) {
    hours = 0;
  }

  return { hours, minutes };
};

export const convertToJSDate = (timeStr: string) => {
  const { hours, minutes } = convertTo24Hour(timeStr);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
};
