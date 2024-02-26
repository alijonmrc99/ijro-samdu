import * as yup from 'yup';
import { DOC_BODY, DOC_TITLE } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const DocumentSchema = yup.object().shape({
    [DOC_TITLE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['performer']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['phone_number']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [DOC_BODY]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});