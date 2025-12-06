import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../lib/api/authApi";

export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
const [loginUser] = useLoginUserMutation();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await loginUser({ name, password }).unwrap();
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Muvaffaqiyatli kirdingiz");
      navigate("/");
    } else {
      toast.error("Login yoki parol noto‘g‘ri");
    }
  } catch (err) {
    toast.error("Login yoki parol noto‘g‘ri");
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-[rgb(160,207,165)]">
      <div className="w-full max-w-md bg-[#F0F3F2] p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-4 text-center text-green-800">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 rounded focus:outline-none border border-[#1E7C1E]"
            />
          </div>

          <div className="mb-4 flex flex-col">
            <label className="text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 rounded focus:outline-none border border-[#1E7C1E]"
            />
          </div>

          <button
            type="submit"
            className="w-full p-2 bg-[#1E7C1E] text-white rounded hover:bg-green-800 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
