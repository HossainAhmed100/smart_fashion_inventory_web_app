import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from "react-router-dom";
import { Spinner } from "@nextui-org/react";
import auth from "../firebase/firebase.config";


function PriviteRoutes({children}) {
  const [user, loading] = useAuthState(auth);  
  const location = useLocation();
  if(loading){
    return <div className="flex item-center justify-center w-full min-h-screen">
    <Spinner size="lg" />
    </div>;
  }
  if(user){
    return children;
  }
  return <Navigate to="/login" state={{from: location}} replace/>
}

export default PriviteRoutes
