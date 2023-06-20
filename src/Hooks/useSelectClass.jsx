import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";

const useSelectClass = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: selectClass = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["selectedClass"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/selected/${user?.email}`);
      return res.data;
    },
  });
  return [selectClass, refetch, isLoading];
};

export default useSelectClass;
