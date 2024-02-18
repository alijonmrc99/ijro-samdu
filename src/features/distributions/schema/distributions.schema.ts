import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const formSchema = yup.object().shape({
    ['date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['structure']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['applicant']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['recipent']: yup.string().required(MSG_ERROR_REQIURED_FIELD),

});