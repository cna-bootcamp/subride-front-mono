import { Navigate, Outlet } from "react-router-dom";

function PrivateRoute({ isLoggedIn }) {
  console.log(isLoggedIn);
  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
