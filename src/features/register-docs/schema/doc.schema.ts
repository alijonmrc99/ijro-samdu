import * as yup from 'yup';
import { DOC_COMMIT, DOC_NAME } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';

export const DocumentSchema = yup.object().shape({
    [DOC_NAME]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    // [DOC_COMMIT]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});