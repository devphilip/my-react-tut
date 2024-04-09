import apiClient from "./apiClient";
import { User } from "./userService";

interface Entity {
    id: number;
}

class HttpService {
  endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll<T>() {
    const controller = new AbortController();
    const request = apiClient.get<T[]>(this.endpoint, { signal: controller.signal });
    return { request, cancel: () => controller.abort() };
  }

  getUser(id: number) {
    return apiClient.get(`/users/${id}`);
  }

  create<T>(entity: T) {
    return apiClient.post(this.endpoint, entity);
  }

  update<T extends Entity>(entity: T) {
    return apiClient.put(this.endpoint + "/" + entity.id, entity);
  }

  delete(id: number) {
    return apiClient.delete(this.endpoint + `/${id}`);
  }
}

const repository = (endpoint: string) => new HttpService(endpoint);

export default repository;
