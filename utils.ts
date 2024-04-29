export const sendResponse = (
  res: any,
  status: number,
  message: string,
  data = []
) =>
  res.status(status).send({
    msg: message,
    status: status,
    data: data,
  });
