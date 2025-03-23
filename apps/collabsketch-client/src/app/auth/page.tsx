import Signin from "@/components/Signin";

const page = () => {
  return (
    <Signin
      component="signin"
      loginHeading="Log in to your account"
      authWithEmailText="Or log in with your Email"
      userAuthOption="New to leetcode ?"
      userAuthAction="Sign up"
    />
  );
};

export default page;
