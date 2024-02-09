import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const formSchema = yup.object().shape({
    ['date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['number']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['summary']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['executor']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['owner']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['file_name']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});