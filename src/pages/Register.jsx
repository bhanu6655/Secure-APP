import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/useStore";
const Register = () => {
  const setUser = useStore((state) => state.setUser);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
  });
  const [errors, setErrors] = useState({});
  const [isChecked, setIsChecked] = useState(false);
  const validateForm = () => {
    const tempErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    if (!formData.name.trim()) tempErrors.name = "Field is required";
    if (!formData.username.trim()) tempErrors.username = "Field is required";
    if (!emailPattern.test(formData.email)) tempErrors.email = "Invalid email format";
    if (!phonePattern.test(formData.mobile)) tempErrors.mobile = "Must be 10 digits";
    if (!isChecked) tempErrors.checkbox = "Check this box if you want to proceed";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setUser(formData);
      navigate("/categories");
    }
  };
  return (
    <div className="flex min-h-screen bg-black font-sans text-white">
      <div className="hidden lg:flex lg:w-1/2 relative bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=2564&auto=format&fit=crop" 
          alt="Super App Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-16 left-16 z-20">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">Discover new<br />things on<br />Superapp</h1>
        </div>
      </div>
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-24 bg-[#0f1014]">
        <div className="w-full max-w-md">
          <h2 className="text-4xl text-[#72DB73] font-bold mb-2">Super app</h2>
          <p className="text-gray-400 mb-8 font-medium">Create your new account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                placeholder="Name"
                className={`w-full bg-[#1b1c21] rounded border ${errors.name ? 'border-red-500' : 'border-[#2d2e36]'} p-4 text-white focus:outline-none focus:border-[#72DB73] transition-colors`}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="UserName"
                className={`w-full bg-[#1b1c21] rounded border ${errors.username ? 'border-red-500' : 'border-[#2d2e36]'} p-4 text-white focus:outline-none focus:border-[#72DB73] transition-colors`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
              {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                className={`w-full bg-[#1b1c21] rounded border ${errors.email ? 'border-red-500' : 'border-[#2d2e36]'} p-4 text-white focus:outline-none focus:border-[#72DB73] transition-colors`}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="Mobile"
                className={`w-full bg-[#1b1c21] rounded border ${errors.mobile ? 'border-red-500' : 'border-[#2d2e36]'} p-4 text-white focus:outline-none focus:border-[#72DB73] transition-colors`}
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
              />
              {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
            </div>
            <div className="flex items-start gap-3 mt-6">
              <input 
                type="checkbox" 
                id="terms" 
                className="mt-1 w-4 h-4 accent-[#72DB73] bg-[#1b1c21] border-[#2d2e36]"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
              />
              <label htmlFor="terms" className="text-sm text-gray-400">
                Share my registration data with Superapp
              </label>
            </div>
            {errors.checkbox && <p className="text-red-500 text-sm mt-1">{errors.checkbox}</p>}
            <button 
              type="submit"
              className="w-full bg-[#72DB73] text-black font-bold text-lg rounded py-3 mt-8 hover:bg-[#5bc05c] transition-colors"
            >
              SIGN UP
            </button>
          </form>
          <div className="mt-8 text-xs text-gray-500 space-y-4">
            <p>By clicking on Sign up. you agree to Superapp <span className="text-[#72DB73]">Terms and Conditions of Use</span></p>
            <p>To learn more about how Superapp collects, uses, shares and protects your personal data please head Superapp <span className="text-[#72DB73]">Privacy Policy</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
