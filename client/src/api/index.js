let baseUrl = process.env.REACT_APP_BASE_URL;

export const getBlogs = async () => {
  try {
    const response = await fetch(`${baseUrl}/blogs`);
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    console.log("Data:", data);
    return data;
    // Handle the data as needed
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
    // Handle errors
  }
};
