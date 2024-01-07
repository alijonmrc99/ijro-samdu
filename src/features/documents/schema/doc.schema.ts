import * as yup from 'yup';
import { AUTH_FIELD_PASSWORD, DOC_TITLE } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const LoginSchema = yup.object().shape({
    [DOC_TITLE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [AUTH_FIELD_PASSWORD]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});