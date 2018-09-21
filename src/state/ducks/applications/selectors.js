export function getPendingApplications(state) {
  let applications = state.applications.applications || [];
  return applications.filter(isPending);
}

export function getAcceptedApplications(state) {
  let applications = state.applications.applications || [];
  return applications.filter(isAccepted);
}

export function getRejectedApplications(state) {
  let applications = state.applications.applications || [];
  return applications.filter(isRejected);
}

export function isPending(application) {
  return application && application.profile.pending;
}

export function isRejected(application) {
  return application && !application.profile.approved &&
    !application.profile.pending;
}

export function isAccepted(application) {
  return application && application.profile.approved &&
    !application.profile.pending;
}

export function getViewingApplication(state) {
  return state.applications.viewingApplication;
}

export function getFirstProfile(state) {
  if (!state || !state.applications || !state.applications.applications) {
    return null;
  }

  const firstApplication = state.applications.applications[0];
  if (!firstApplication) {
    return null;
  }

  return firstApplication.profile;
}

export function getApplicationAddresses(state) {
  const applications = (state.applications && state.applications.applications) || [];
  const addresses = {};

  applications.forEach((application) => {
    if (application.pool && application.pool.address) {
      addresses[application.pool.address] = true;
    }
  });

  return addresses;
}
