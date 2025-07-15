export const handleApiError = (error, operation) => {
  const errorMessage = error.response?.data?.message || error.message || 'Unknown error occurred';
  console.error(`Error ${operation}:`, errorMessage);
  throw new Error(errorMessage);
};

export const processApiResponse = (response) => {
  const { data } = response;
  // Backend response is now wrapped, so we access the actual data via `data.data`
  if (data && data.success) {
    return data.data;
  }
  // Handle cases where the response might not be the wrapped one, or if success is false
  throw new Error(data.message || 'An error occurred while processing the response.');
};
