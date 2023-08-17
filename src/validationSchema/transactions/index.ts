import * as yup from 'yup';

export const transactionValidationSchema = yup.object().shape({
  script_name: yup.string().required(),
  buy_price: yup.number().integer().required(),
  sell_price: yup.number().integer().required(),
  buy_qty: yup.number().integer().required(),
  sell_qty: yup.number().integer().required(),
  organization_id: yup.string().nullable(),
});
