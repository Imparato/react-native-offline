// @flow
import { isEqual } from 'lodash';

/**
 * Finds and returns a similar thunk or action in the actionQueue.
 * Else undefined.
 * @param action
 * @param actionQueue
 */
export default function getSimilarActionInQueue(
  action: *,
  actionQueue: Array<*>,
) {
  if (typeof action === 'object') {
    return actionQueue.find((queued: *) => isEqual(queued, action));
  }
  if (typeof action === 'function') {
    return actionQueue.find((queued: *) => {
      let isArgsEqual;

      if (action.meta && queued.meta) {
        isArgsEqual = isEqual(action.meta.args, queued.meta.args);
      } else {
        isArgsEqual = true;
      }

      return action.toString() === queued.toString() && isArgsEqual;
    });
  }
  return undefined;
}
