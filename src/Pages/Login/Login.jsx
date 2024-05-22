import { Button, Card, CardBody, Checkbox, Input } from "@nextui-org/react";
import { Helmet } from 'react-helmet-async';    
import { useState, useEffect } from "react";
import { HiEye, HiEyeOff } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    signInWithEmailAndPassword(data.email, data.password);
  };

  useEffect(() => {
    if (error) {
      let errorMessage;
      switch (error?.code) {
        case "auth/too-many-requests":
          errorMessage = "Too many requests. Please reset your password!";
          break;
        case "auth/invalid-credential":
          errorMessage = "Invalid credentials. Please check your email and password!";
          break;
        case "auth/user-not-found":
          errorMessage = "User not found. Please check your email!";
          break;
        case "auth/wrong-password":
          errorMessage = "Wrong password. Please try again!";
          break;
        default:
          errorMessage = "An unexpected error occurred. Please try again!";
      }
      Swal.fire({
        icon: "error",
        title: "Authentication Error",
        text: errorMessage,
      });
    }
  }, [error]);

  return (
    <section>
      <Helmet title='Login now | Mayer Doa Inventory'/>
      <div className="flex items-center justify-center min-h-screen">
        <div>
          <Card className="w-[350px] shadow p-4">
            <CardBody>
              <form onSubmit={handleSubmit(onSubmit)} className="flex min-w-full flex-col mb-6 md:mb-0 gap-4">
                <div>
                  <h3 className="font-bold text-center text-2xl">SIGN IN</h3>
                </div>
                <Input 
                  radius="sm" 
                  size={"md"}
                  type="email" 
                  name="email"
                  label="Email" 
                  className="w-full"
                  variant="bordered" 
                  labelPlacement="outside" 
                  placeholder="Type Your Email" 
                  {...register("email", { required: "Please enter your email", pattern: { value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/, message: "Email is not valid" } })}
                  color={errors.email ? "danger" : "default"}
                />
                {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                <Input
                  radius="sm" 
                  size={"md"}
                  label="Password"
                  labelPlacement="outside"
                  variant="bordered"
                  placeholder="Enter your password"
                  endContent={
                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (<HiEyeOff />) : (<HiEye />)}
                    </button>
                  }
                  type={isVisible ? "text" : "password"}
                  className="w-full"
                  {...register("password", { required: "Please enter your password", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
                  color={errors.password ? "danger" : "default"}
                />
                {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                <div className="flex items-center justify-between pb-3">
                  <Checkbox size="sm" defaultChecked>Remember me</Checkbox>
                  <Link className="text-sm text-blue-500 font-medium">
                    Forgot Password?
                  </Link>
                </div>
                <Button isLoading={loading} type="submit" color="primary">Sign in</Button>
              </form> 
              <div className="flex flex-col items-center justify-center space-y-2 my-6">
                <div className="flex items-center justify-center gap-1">
                  <p className="text-[12px]">Don't have an account?</p> 
                  <Link to="/register" className="text-sm text-blue-500 font-medium">
                    Register now!
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default Login;
