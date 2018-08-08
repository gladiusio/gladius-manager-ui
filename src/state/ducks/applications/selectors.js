export function getPendingApplications(applications) {
  applications = applications || [];
  return applications.filter((application) => {
    return application && application.profile.pending;
  });
}

export function getAcceptedApplications(applications) {
  applications = applications || [];
  return applications.filter((application) => {
    return application && application.profile.approved &&
      !application.profile.pending;
  });
}

export function getRejectedApplications(applications) {
  applications = applications || [];
  return applications.filter((application) => {
    return application && !application.profile.approved &&
      !application.profile.pending;
  });
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
