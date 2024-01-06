import * as yup from 'yup';
import { AUTH_FIELD_PASSWORD, AUTH_FIELD_USER_NAME } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const LoginSchema = yup.object().shape({
    [AUTH_FIELD_USER_NAME]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [AUTH_FIELD_PASSWORD]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});