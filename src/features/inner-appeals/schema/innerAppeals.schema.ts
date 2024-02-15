import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const formSchema = yup.object().shape({
    ['accepted_date_and_index']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['given_date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['performed_sign']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['creator']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['title_or_summary']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['resolution']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['performer_and_date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});

