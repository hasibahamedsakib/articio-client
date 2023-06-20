import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const {
    data: isInstructor = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["instructor", user?.email],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/students/${user?.email}`);

      return res?.data;
    },
  });

  return [isInstructor, isLoading, refetch];
};

export default useInstructor;
