import * as yup from 'yup';
import { DOC_COMMENT, DOC_NAME, DOC_STATUS } from '../constants';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';


export const DocumentSchema = yup.object().shape({
    [DOC_STATUS]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [DOC_NAME]: yup.string().when(DOC_STATUS, ([status], schema) => {
        if (status === "approved") {
            return schema.required(MSG_ERROR_REQIURED_FIELD)
        }
        return schema
    }),
    [DOC_COMMENT]: yup.string().when(DOC_STATUS, ([status], schema) => {
        if (status === "approved") {
            return schema.required(MSG_ERROR_REQIURED_FIELD)
        }
        return schema
    }),

});