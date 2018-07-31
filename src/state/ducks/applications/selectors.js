export function getPendingApplications(applications) {
  return applications.filter((application) => {
    return application && application.profile.pending;
  });
}

export function getAcceptedApplications(applications) {
  return applications.filter((application) => {
    return application && application.profile.approved &&
      !application.profile.pending;
  });
}

export function getRejectedApplications(applications) {
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
