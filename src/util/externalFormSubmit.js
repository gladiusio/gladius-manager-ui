import { submit } from 'redux-form';

export default function bemify(dispatch, formIds) {
  return new Promise((resolve) => {
    formIds.forEach((formId) => {
      dispatch(submit(formId));
    });

    // Necessary due to how external submit works for redux-form.
    // Resolve should be able to assume that all the forms have been
    // submitted by that point.
    setTimeout(resolve);
  })
}
