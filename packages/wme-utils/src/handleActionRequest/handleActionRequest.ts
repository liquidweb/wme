import type JQueryXHR from 'jquery';

interface HandleActionPayloadInterface {
  _wpnonce: string;
  action: string;
  sub_action: string;
}

/**
 * Submit payload for use by WME Ajax Action
 *
 * @param {HandleActionPayloadInterface} payload - Data for use as payload
 * @example
 * {
 *   _wpnonce: '',
 *   action: '',
 *   sub_action: ''
 * }
 * @return {Promise}
 */
export const handleActionRequest = <T extends HandleActionPayloadInterface>(payload: T) => {
  const promise = new Promise((resolve, reject) => {
    window.wp.ajax.post(payload).done((response: any): any => {
      resolve(response || 'success');
    }).catch((response: JQueryXHR): any => {
      if (response) {
        reject(response?.responseJSON ? response.responseJSON.data : response.responseText);
      }
      reject();
    });
  });

  return promise;
};
