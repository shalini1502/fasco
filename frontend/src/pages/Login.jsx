// import { useState } from "react";

// const Login = () => {
//   const [currentState, setCurrentState] = useState("Sign Up");

//   const onSubmitHandler = async (event) => {
//     event.preventDefault();
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{currentState}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>
//       {currentState === "Login" ? (
//         ""
//       ) : (
//         <input
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="John Doe"
//           required
//         />
//       )}
//       <input
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="hello@gmail.com"
//         required
//       />
//       <input
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />
//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {currentState === "Login" ? (
//           <p
//             onClick={() => setCurrentState("Sign Up")}
//             className="cursor-pointer"
//           >
//             Create a new account
//           </p>
//         ) : (
//           <p
//             onClick={() => setCurrentState("Login")}
//             className="cursor-pointer"
//           >
//             Login here
//           </p>
//         )}
//       </div>
//       <button className="px-8 py-2 mt-4 font-light text-white bg-black">
//         {currentState === "Login" ? "Sign In" : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;

// src/pages/Login.jsx
// src/pages/Login.jsx

// import { useState, useContext } from "react";
// import { ShopContext } from "../context/ShopContext";
// import { toast } from "react-toastify";

// const Login = () => {
//   const [mode, setMode] = useState("Sign Up"); // "Login" or "Sign Up"
//   const { login, register } = useContext(ShopContext);

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       if (mode === "Login") {
//         await login({ email, password });
//       } else {
//         if (!name.trim()) {
//           toast.error("Name is required for sign up");
//           setLoading(false);
//           return;
//         }
//         await register({ name, email, password });
//       }
//     } catch (e) {
//       // errors are already handled inside context with toasts
//       console.log("error", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={onSubmitHandler}
//       className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
//     >
//       <div className="inline-flex items-center gap-2 mt-10 mb-2">
//         <p className="text-3xl prata-regular">{mode}</p>
//         <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
//       </div>

//       {mode !== "Login" && (
//         <input
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           type="text"
//           className="w-full px-3 py-2 border border-gray-800"
//           placeholder="John Doe"
//           required
//         />
//       )}

//       <input
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         type="email"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="hello@gmail.com"
//         required
//       />

//       <input
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//         className="w-full px-3 py-2 border border-gray-800"
//         placeholder="Password"
//         required
//       />

//       <div className="flex justify-between w-full text-sm mt-[-8px]">
//         <p className="cursor-pointer">Forgot your password?</p>
//         {mode === "Login" ? (
//           <p onClick={() => setMode("Sign Up")} className="cursor-pointer">
//             Create a new account
//           </p>
//         ) : (
//           <p onClick={() => setMode("Login")} className="cursor-pointer">
//             Login here
//           </p>
//         )}
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-60"
//       >
//         {loading
//           ? mode === "Login"
//             ? "Signing in..."
//             : "Signing up..."
//           : mode === "Login"
//           ? "Sign In"
//           : "Sign Up"}
//       </button>
//     </form>
//   );
// };

// export default Login;

// src/pages/Login.jsx
import { useState, useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const [mode, setMode] = useState("Sign Up"); // "Login" or "Sign Up"
  const { login, register } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (mode === "Login") {
        await login({ email, password });
      } else {
        if (!name.trim()) {
          toast.error("Name is required for sign up");
          setLoading(false);
          return;
        }
        await register({ name, email, password });
      }
    } catch (err) {
      // errors are already handled inside context with toasts
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mt-10 mb-2">
        <p className="text-3xl prata-regular">{mode}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {mode !== "Login" && (
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="John Doe"
          required
        />
      )}

      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="hello@gmail.com"
        required
      />

      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="flex justify-between w-full text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {mode === "Login" ? (
          <p onClick={() => setMode("Sign Up")} className="cursor-pointer">
            Create a new account
          </p>
        ) : (
          <p onClick={() => setMode("Login")} className="cursor-pointer">
            Login here
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-8 py-2 mt-4 font-light text-white bg-black disabled:opacity-60"
      >
        {loading
          ? mode === "Login"
            ? "Signing in..."
            : "Signing up..."
          : mode === "Login"
          ? "Sign In"
          : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
