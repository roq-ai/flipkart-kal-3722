import { BrokerageInterface } from 'interfaces/brokerage';
import { NoteInterface } from 'interfaces/note';
import { PositionInterface } from 'interfaces/position';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface TransactionInterface {
  id?: string;
  script_name: string;
  buy_price: number;
  sell_price: number;
  buy_qty: number;
  sell_qty: number;
  organization_id?: string;
  created_at?: any;
  updated_at?: any;
  brokerage?: BrokerageInterface[];
  note?: NoteInterface[];
  position?: PositionInterface[];
  organization?: OrganizationInterface;
  _count?: {
    brokerage?: number;
    note?: number;
    position?: number;
  };
}

export interface TransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
  script_name?: string;
  organization_id?: string;
}
