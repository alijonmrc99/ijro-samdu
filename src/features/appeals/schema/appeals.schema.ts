import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const formSchema = yup.object().shape({
    ['performer_and_given_date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['hand_over_date']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['executed_sign']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['creator']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['title_or_summary']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['resolution']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['index_and_created_at']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});

