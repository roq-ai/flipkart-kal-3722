import * as yup from 'yup';

export const positionValidationSchema = yup.object().shape({
  type: yup.string().required(),
  transaction_id: yup.string().nullable(),
});
