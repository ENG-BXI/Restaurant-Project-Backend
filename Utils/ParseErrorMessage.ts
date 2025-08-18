const ParseErrorMessage = (error: unknown) => {
  return JSON.parse((error as Error).message);
};

export default ParseErrorMessage;
