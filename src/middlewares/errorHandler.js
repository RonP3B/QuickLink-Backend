export const errorHandler = (err, req, res, next) => {
  const error = err.errors ? "Internal Server Error" : err.message;
  const responseObj = { error };
  if (err.toastMsg) responseObj.toastMsg = err.toastMsg;
  return res.status(err.statusCode || 500).json(responseObj);
};
