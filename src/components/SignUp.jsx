import {
      motion,
      useMotionTemplate,
      useMotionValue,
      animate,
    } from "motion/react";
    import React, { useEffect } from "react";
    import axios from "axios";
    import { useNavigate } from "react-router";
    
    function SignUp() {
      const Colors = ["#DD335C", "#ff5e57", "#e073c5", "#1E67C6", "#CE84CF"];
      const color = useMotionValue(Colors[0]);
      const navigate = useNavigate();
    
      useEffect(() => {
        animate(color, Colors, {
          duration: 10,
          repeat: Infinity,
          repeatType: "mirror",
        });
      }, []);
    
      const [user, setUser] = React.useState({
        yourname: "",
        youremail: "",
        password: "",
      });
    
      const handleOnChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const respones = await axios.post(
            "http://localhost:5000/api/auth/register",
            {
              yourname: user.yourname,
              youremail: user.youremail,
              password: user.password,
            }
          );
          if (respones.data.success === "success") {
            navigate("/Login");
          }
          if (respones.data.success === "failure") {
            console.log(Response.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
    
      const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%,#020617 50%, ${color})`;
      const border = useMotionTemplate`1px solid ${color}`;
      const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;
    
      return (
        <motion.div
          style={{ backgroundImage }}
          className="h-[87vh] flex gap-5 items-center justify-center"
        >
          <motion.div className="rounded-2xl flex flex-col justify-center items-center space-y-6 p-4 h-[80%] w-[80%] md:w-[60%] lg:h-[70%] lg:w-[45%] shadow-md shadow-pink-500">
            <h1 className="text-5xl h-25 md:h-20 md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
              Sign Up Now
            </h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col w-full relative z-5"
            >
              <div className="flex flex-col gap-10 justify-center items-center container m-auto w-[90%] my-5">
                <motion.input
                  name="yourname"
                  type="text"
                  value={user.yourname}
                  onChange={handleOnChange}
                  style={{ border }}
                  className="h-[2.5rem] font-semibold outline-none shadow shadow-pink-800 text-gray-500 w-full rounded-md p-4"
                  placeholder="👤 Your Name"
                />
                <motion.input
                  name="youremail"
                  type="email"
                  value={user.youremail}
                  onChange={handleOnChange}
                  style={{ border }}
                  className="h-[2.5rem] font-semibold outline-none shadow shadow-pink-800 text-gray-500 w-full rounded-md p-4"
                  placeholder="✉ Your Email"
                />
                <motion.input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleOnChange}
                  style={{ border }}
                  className="h-[2.5rem] font-semibold outline-none shadow shadow-pink-800 text-gray-500 w-full rounded-md p-4"
                  placeholder="🔒 Password"
                />
                <motion.input
                  whileTap={{ scale: 0.8, transition: { duration: 0.3 } }}
                  type="submit"
                  value="Sign Up"
                  style={{ boxShadow, backgroundColor: color }}
                  className="p-2 rounded-2xl text-white font-semibold text-sm md:text-xl w-[50%] md:w-[30%] shadow-purple-900 shadow-md cursor-pointer"
                />
              </div>
            </form>
          </motion.div>
        </motion.div>
      );
    }
    
    export default SignUp;
    