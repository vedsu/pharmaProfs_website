import { useRouteError } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);
  return <div className="text-center text-2xl"> Page not found !</div>;
};

export default ErrorBoundary;
