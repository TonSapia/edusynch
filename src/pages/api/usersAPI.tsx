import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
  img: string;
}

export const getUserAPI = async (user: number) => {  
  const response = await axios.get<User>(`http://localhost:3030/users/${user}`, {});
  return response.data; 
};

export const getSubscribeAPI = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(true);
    }, 3000);
  });
}


