import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const formSchema = yup.object().shape({
    ['number']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['summary']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['sent_place']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});