// DateUtils.js
export const getFormattedDate = (num) => {
  const today = new Date();
  const adjustedDate = new Date(today);

  //Change that -1 to change how many days to go forward / backward
  adjustedDate.setDate(today.getDate() - num);

  const year = adjustedDate.getFullYear();
  const month = String(adjustedDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(adjustedDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const convertToEST = (isoString) => {
  const utcDate = new Date(isoString);
  
  // Adjust the time zone to Eastern Standard Time (EST)
  const estDate = new Date(utcDate.toLocaleString('en-US', { timeZone: 'America/New_York' }));

  // Format the time
  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true, // Use 12-hour clock format
    timeZoneName: 'short',
  };

  return estDate.toLocaleString('en-US', options);
}
