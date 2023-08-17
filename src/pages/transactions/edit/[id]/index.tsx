import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getTransactionById, updateTransactionById } from 'apiSdk/transactions';
import { transactionValidationSchema } from 'validationSchema/transactions';
import { TransactionInterface } from 'interfaces/transaction';
import { OrganizationInterface } from 'interfaces/organization';
import { getOrganizations } from 'apiSdk/organizations';

function TransactionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<TransactionInterface>(
    () => (id ? `/transactions/${id}` : null),
    () => getTransactionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: TransactionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateTransactionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/transactions');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<TransactionInterface>({
    initialValues: data,
    validationSchema: transactionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Transactions',
              link: '/transactions',
            },
            {
              label: 'Update Transaction',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Transaction
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.script_name}
            label={'Script Name'}
            props={{
              name: 'script_name',
              placeholder: 'Script Name',
              value: formik.values?.script_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Buy Price"
            formControlProps={{
              id: 'buy_price',
              isInvalid: !!formik.errors?.buy_price,
            }}
            name="buy_price"
            error={formik.errors?.buy_price}
            value={formik.values?.buy_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('buy_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Sell Price"
            formControlProps={{
              id: 'sell_price',
              isInvalid: !!formik.errors?.sell_price,
            }}
            name="sell_price"
            error={formik.errors?.sell_price}
            value={formik.values?.sell_price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sell_price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Buy Qty"
            formControlProps={{
              id: 'buy_qty',
              isInvalid: !!formik.errors?.buy_qty,
            }}
            name="buy_qty"
            error={formik.errors?.buy_qty}
            value={formik.values?.buy_qty}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('buy_qty', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Sell Qty"
            formControlProps={{
              id: 'sell_qty',
              isInvalid: !!formik.errors?.sell_qty,
            }}
            name="sell_qty"
            error={formik.errors?.sell_qty}
            value={formik.values?.sell_qty}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('sell_qty', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<OrganizationInterface>
            formik={formik}
            name={'organization_id'}
            label={'Select Organization'}
            placeholder={'Select Organization'}
            fetcher={getOrganizations}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/transactions')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'transaction',
    operation: AccessOperationEnum.UPDATE,
  }),
)(TransactionEditPage);
