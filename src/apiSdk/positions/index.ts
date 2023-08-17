import axios from 'axios';
import queryString from 'query-string';
import { PositionInterface, PositionGetQueryInterface } from 'interfaces/position';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getPositions = async (
  query?: PositionGetQueryInterface,
): Promise<PaginatedInterface<PositionInterface>> => {
  const response = await axios.get('/api/positions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createPosition = async (position: PositionInterface) => {
  const response = await axios.post('/api/positions', position);
  return response.data;
};

export const updatePositionById = async (id: string, position: PositionInterface) => {
  const response = await axios.put(`/api/positions/${id}`, position);
  return response.data;
};

export const getPositionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/positions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePositionById = async (id: string) => {
  const response = await axios.delete(`/api/positions/${id}`);
  return response.data;
};
