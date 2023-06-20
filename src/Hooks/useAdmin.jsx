import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
  const { user, loading } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const {
    isLoading,
    refetch,
    data: isAdmin = [],
  } = useQuery({
    queryKey: ["admin", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${user?.email}`);

      return res?.data;
    },
  });

  return [isAdmin, isLoading, refetch];
};

export default useAdmin;
