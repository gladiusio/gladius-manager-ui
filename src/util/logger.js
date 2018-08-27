const ravenLoaded = !!window.Raven;

export function captureError(message, data, level='error') {
  if (ravenLoaded) {
    window.Raven.captureMessage(message, {extra: data, level});
  }
}
