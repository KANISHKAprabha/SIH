export const generateRandomData = (count, startTime, range) => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push([startTime + i * 1000, Math.floor(Math.random() * 100)]);
    }
    return data;
  };
export  const generateRandomCategories = () => {
    return Array.from({ length: 10 }, (_, i) => `Category ${i + 1}`);
  };
export  const generateRandomScatterData = (count) => {
    return Array.from({ length: count }, () => [
      Math.random() * 100,
      Math.random() * 100,
    ]);
  };
 export const getNewSeries = (lastDate, range,data) => {
    const newData = [...data]; // Copy of the current data
  
    // Remove the oldest data point
    newData.shift();
  
    // Generate new value and append it
    const newTimestamp = lastDate + 1000; // Increment time by 1 second
    const newValue = Math.floor(Math.random() * (range.max - range.min + 1) + range.min); // Random value within the range
  
    newData.push([newTimestamp, newValue]);
  
    return newData;
  };

  //monk data for the pie chart 
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

  export const generateRandomPieData = () => {
    const allowedRequests = getRandomInt(10, 100); // Random value between 10 and 100
    const blockedRequests = getRandomInt(0, 50); // Random value between 0 and 50
    
    return [
      {
        id: "Allowed Requests",
        label: "Allowed Requests",
        value: allowedRequests,
        color: "hsl(120, 70%, 50%)", // Green color for allowed requests
      },
      {
        id: "Blocked Requests",
        label: "Blocked Requests",
        value: blockedRequests,
        color: "hsl(0, 70%, 50%)", // Red color for blocked requests
      },
    ];
  };