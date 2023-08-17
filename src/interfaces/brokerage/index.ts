import { TransactionInterface } from 'interfaces/transaction';
import { GetQueryInterface } from 'interfaces';

export interface BrokerageInterface {
  id?: string;
  amount: number;
  transaction_id?: string;
  created_at?: any;
  updated_at?: any;

  transaction?: TransactionInterface;
  _count?: {};
}

export interface BrokerageGetQueryInterface extends GetQueryInterface {
  id?: string;
  transaction_id?: string;
}
