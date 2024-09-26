export const generateMockData = () => {
    const statuses = [200, 404, 500];
    const data = [];
  
    for (let i = 0; i < 500; i++) {
      data.push({
        id: i + 1,
        ip: `192.168.1.${Math.floor(Math.random() * 100)}`,
        requestIp: `192.168.1.${Math.floor(Math.random() * 100)}`,
        time: new Date(Date.now() - Math.random() * 1000000000).toISOString(),
        server: `Server ${Math.ceil(Math.random() * 10)}`,
        requestStatus: statuses[Math.floor(Math.random() * statuses.length)],
        blocked: Math.random() > 0.5, // Randomly set blocked status
      });
    }
  
    return data;
  };  