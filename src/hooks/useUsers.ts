import { useEffect, useState } from "react";
import userService, { User } from "../services/userService";
import { CanceledError } from "../services/apiClient";


const useUsers = () => {

  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {

    // const controller = new AbortController();

    setIsLoading(true);
    // get returns a promise, when resolved, we get the data otherwise we get the error
    const { request, cancel } = userService.getAll<User>()
      request.then((res) => { setIsLoading(false); setUsers(res.data)})
      .catch((err) => {
        if (err instanceof CanceledError) return
        setError(err.message)
        setIsLoading(false);
      });
      // .finally(() => setIsLoading(false));

    return () => cancel();
  }, []);

    return { users, error, isLoading, setUsers, setError }
}

export default useUsers