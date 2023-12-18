/* eslint-disable no-unused-vars */
import axios, { AxiosResponse } from 'axios';


axios.defaults.baseURL = "http://localhost:5145/api/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url:string) => axios.get(url).then(responseBody),
    post: (url:string, body:object) => axios.post(url, body).then(responseBody),
    put: (url:string, body:object) => axios.put(url, body).then(responseBody),
    delete: (url:string) => axios.delete(url).then(responseBody),
  };


const TODO = {
    getAll: () => requests.get('TodoItems'),
    get: (id:number) => requests.get(`TodoItems/${id}`),
    addItem: (text:string) => requests.post('TodoItems', { text } ),
    editItem: (id:number, text:string) => requests.put(`TodoItems/${id}`, { text }),
    deleteItem: (id:number) => requests.delete(`TodoItems/${id}`)
};

const agent = {
    TODO
};

export default agent;