import {Moment} from 'moment';
import * as moment from 'moment';


/**
 * Parse date string to moment object.
 * @param yyyyMmDd Date in YYYY-MM-DD
 */
export function toDate(yyyyMmDd: string): Moment {
  if (!yyyyMmDd) {
    return null;
  }
  return moment(yyyyMmDd);
}
