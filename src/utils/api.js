const api = path => {
  const url = process.env.IOT_MANAGER_API || 'http://localhost:3000';
  return `${url}${path}`;
};

export default api;
