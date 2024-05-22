import { FaGoogle } from "react-icons/fa6";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase/firebase.config";
import { Button } from "@nextui-org/react";

function GoogleLogin() {
    const navigate = useNavigate();
    const [signInWithGoogle, loading, error] = useSignInWithGoogle(auth);
    console.log("🚀 ~ GoogleLogin ~ loading:", loading, error)
  return (
    <div>
      <Button startContent={<FaGoogle />} color="primary" start onClick={async () => {
          const success = await signInWithGoogle();
          if (success) {
            navigate("/")
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Log in Successfull",
                showConfirmButton: false,
                timer: 1500
              });
          }
        }} className="w-full">  
          Log in With Google
      </Button>
    </div>
  )
}

export default GoogleLogin
