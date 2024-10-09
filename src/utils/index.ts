import axios from "axios";

export const getCurrentTimeStamp = () => {
    const currentDate = Date.now();
    const date = new Date(currentDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}:${minutes}:${seconds}`;
  };

export  const modelTrain = async (sub: string, prompt: string, steps: number, photoFolderName: string) => {
    const url = 'https://2hohe1gynf.execute-api.us-east-2.amazonaws.com/api/modelTrainFibb';
    
    const data = {
      sub,
      prompt,
      steps,
      photoFolderName
    };
  
    try {
      const response = await axios.post(url, data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      console.log('Success:', response.data);
      return response.data;
    } catch (error) {
      console.error(JSON.stringify(error));
    }
  }