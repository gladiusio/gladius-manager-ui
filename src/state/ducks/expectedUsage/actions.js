import { createAction } from '../../../util/createAction';
import {
  SET_EXPECTED_USAGE
} from './types';

export function setExpectedUsage(expectedUsage) {
  return createAction(SET_EXPECTED_USAGE, expectedUsage)
}
