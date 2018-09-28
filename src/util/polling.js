const polls = {};

export function startPoll(id, fn, interval) {
  if (id in polls) {
    return;
  }

  fn();
  return polls[id] = setInterval(fn, interval);
}

export function endPoll(id) {
  clearInterval(polls[id]);
  delete polls[id];
}
