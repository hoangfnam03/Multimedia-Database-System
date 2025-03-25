export const searchImage = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch("http://localhost:8000/search/", {
    method: "POST",
    body: formData,
  });

  return response.json();
};
