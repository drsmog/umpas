const cache = new Map();

function getService(projectId) {
  return cache.get(projectId);
}

function saveService(projectId, service) {
  cache.set(projectId, service);
}

module.exports = {
  getService: getService,
  saveService: saveService
};
