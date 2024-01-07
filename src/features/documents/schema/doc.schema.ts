import * as yup from 'yup';
import { DOC_TITLE } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const DocumentSchema = yup.object().shape({
    [DOC_TITLE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});