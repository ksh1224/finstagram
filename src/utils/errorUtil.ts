async function errorUtil(data: any) {
  const error = new Error();
  error.name = data.error;
  error.message = data.message;
  error.stack = data;
  throw error;
}

export default errorUtil;
