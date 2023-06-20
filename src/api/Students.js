const token = localStorage.getItem("access-token");

export const savedStudentToDB = (student) => {
  const { displayName, email, photoURL } = student;
  const studentsInfo = { displayName, email, photoURL };
  return fetch("https://articio-server.vercel.app/students", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(studentsInfo),
  });
};

export const DeleteClass = (id) => {
  return fetch(`https://articio-server.vercel.app/selected/${id}`, {
    method: "delete",
    headers: { Authorization: `Bearer ${token}` },
  });
};
