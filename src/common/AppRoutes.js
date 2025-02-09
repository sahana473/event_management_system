export const ApiRoutes = {
  REGISTER: (data) => `http://localhost:1000/api/user/${data}/register`,
  UNREGISTER: (data) => `http://localhost:1000/api/user/${data}/unregister`,
  CREATE_USER: "http://localhost:1000/api/user/create",
  LOGIN_USER: "http://localhost:1000/api/user/login",
  ALL_EVENTS: "http://localhost:1000/api/events",
};
