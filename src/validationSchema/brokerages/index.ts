import * as yup from 'yup';

export const brokerageValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  transaction_id: yup.string().nullable(),
});
