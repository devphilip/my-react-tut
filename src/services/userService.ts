import repository from "./httpService";

export interface User {
  id: number;
  name: string;
}

/* class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClient.get<User[]>("/users", { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  getUser(id: number) {
    return apiClient.get(`/users/${id}`);
  }

  addUser(user: User) {
    return apiClient.post("/users", user);
  }

  updateUser(user: User) {
    return apiClient.put("/users/" + user.id, user);
  }

  deleteUser(id: number) {
    return apiClient.delete(`/users/${id}`);
  }
} */

export default repository("/users");
