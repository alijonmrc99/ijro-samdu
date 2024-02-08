import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const LettersSchema = yup.object().shape({
    ['sent_place_person']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    ['cost']: yup.number().required(MSG_ERROR_REQIURED_FIELD),
    ['comment']: yup.string(),
    ['sent_at']: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});