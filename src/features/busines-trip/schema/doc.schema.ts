import * as yup from 'yup';
import { MSG_ERROR_REQIURED_FIELD } from '../../../common/constants/error.constants';
import { END_DATE, JOB, START_DATE, TRAVEL_PLACE, USER_NAME } from '../constants';

export const DocumentSchema = yup.object().shape({
    [USER_NAME]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [JOB]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [TRAVEL_PLACE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [START_DATE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
    [END_DATE]: yup.string().required(MSG_ERROR_REQIURED_FIELD),
});