export function getPendingApplications(applications) {
  applications = applications || [];
  return applications.filter(isPending);
}

export function getAcceptedApplications(applications) {
  applications = applications || [];
  return applications.filter(isAccepted);
}

export function getRejectedApplications(applications) {
  applications = applications || [];
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

export function getFirstProfile(applications) {
  const firstApplication = applications.applications[0];
  if (!firstApplication) {
    return null;
  }

  return firstApplication.profile;
}
