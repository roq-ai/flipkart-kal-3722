import axios from 'axios';
import queryString from 'query-string';
import { BrokerageInterface, BrokerageGetQueryInterface } from 'interfaces/brokerage';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBrokerages = async (
  query?: BrokerageGetQueryInterface,
): Promise<PaginatedInterface<BrokerageInterface>> => {
  const response = await axios.get('/api/brokerages', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBrokerage = async (brokerage: BrokerageInterface) => {
  const response = await axios.post('/api/brokerages', brokerage);
  return response.data;
};

export const updateBrokerageById = async (id: string, brokerage: BrokerageInterface) => {
  const response = await axios.put(`/api/brokerages/${id}`, brokerage);
  return response.data;
};

export const getBrokerageById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/brokerages/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBrokerageById = async (id: string) => {
  const response = await axios.delete(`/api/brokerages/${id}`);
  return response.data;
};
