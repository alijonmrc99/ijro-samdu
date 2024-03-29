import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const DocumentSchema = yup.object().shape({
    ['username']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['full_name']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['job']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['password']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});