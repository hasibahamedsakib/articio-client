import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import { AuthContext } from "../Provider/AuthProvider";

export const GetPopularCourse = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("https://articio-server.vercel.app/popular-classes")
      .then((res) => res.json())
      .then((data) => {
        setPopular(data);
      });
  }, []);
  return popular;
};
// get All Classes
export const GetAllClasses = () => {
  const [axiosSecure] = useAxiosSecure();
  const { loading } = useContext(AuthContext);
  const {
    data: classes = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/all-classes");
      return res.data;
    },
  });
  return [classes, refetch, isLoading];
};
// // update classes status
// export const UpdateStatus = () => {
//   const [axiosSecure] = useAxiosSecure();
//   const {
//     data: status = [],
//     refetch,
//     isLoading,
//   } = useQuery({
//     queryKey: ["classes"],
//     queryFn: async () => {
//       const res = await axiosSecure.patch("/classes");
//       return res.data;
//     },
//   });
//   return [status, refetch, isLoading];
// };

// Get All Approve classes
export const useGetAllApproveClass = () => {
  const { loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const {
    data: approvedClass = [],
    refetch,
    isLoading: classLoading,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/classes");
      return res.data;
    },
  });
  return [approvedClass, refetch, classLoading];
};

// Get All instructors classes
export const useGetAllClasses = (email) => {
  const { loading } = useContext(AuthContext);

  const [axiosSecure] = useAxiosSecure();
  const {
    data: myClasses = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["classes"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/my-classes/${email}`);
      return res.data;
    },
  });
  return [myClasses, refetch, isLoading];
};
export const GetPopularInstructors = () => {
  const [popular, setPopular] = useState([]);
  useEffect(() => {
    fetch("https://articio-server.vercel.app/popular-instructors")
      .then((res) => res.json())
      .then((data) => {
        setPopular(data);
      });
  }, []);
  return popular;
};

export const GetAllInstructors = () => {
  const [axiosSecure] = useAxiosSecure();
  const { loading } = useContext(AuthContext);
  const { data: allInstructors = [] } = useQuery({
    queryKey: ["allInstructors"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get("/instructors");
      return res.data;
    },
  });
  return allInstructors;
};

export const SaveImageToDB = (data) => {
  const image = data?.classImage[0];

  const formData = new FormData();
  formData.append("image", image);

  return fetch(
    `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    } `,
    {
      method: "POST",
      body: formData,
    }
  );
};

export const useEnrolled = () => {
  const { user } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();
  const { data: enrolledClass = [], refetch } = useQuery({
    queryKey: ["enrolledClass"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/enrolled/${user?.email}`);
      return res.data;
    },
  });
  return [enrolledClass, refetch];
};
