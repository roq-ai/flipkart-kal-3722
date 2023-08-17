import { TransactionInterface } from 'interfaces/transaction';
import { GetQueryInterface } from 'interfaces';

export interface PositionInterface {
  id?: string;
  type: string;
  transaction_id?: string;
  created_at?: any;
  updated_at?: any;

  transaction?: TransactionInterface;
  _count?: {};
}

export interface PositionGetQueryInterface extends GetQueryInterface {
  id?: string;
  type?: string;
  transaction_id?: string;
}
