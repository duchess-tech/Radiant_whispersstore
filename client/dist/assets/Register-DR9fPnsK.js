import{r as s,C as g,j as e,Q as w,h as j,B as a}from"./index-DGuUlOCP.js";import{a as y}from"./index-NeIKhBu8.js";import"./iconBase-BnN7GuYI.js";const R=()=>{const o=s.useRef(""),l=s.useRef(""),n=s.useRef(""),i=s.useRef(""),d=s.useRef(""),{setOpenRegister:t,handleLogin:c}=s.useContext(g),[f,m]=s.useState(!1),p=async h=>{m(!0),h.preventDefault();const u={fullname:o.current.value,email:l.current.value,phonenumber:d.current.value,password:n.current.value,confirmpassword:i.current.value};console.log(u);try{const r=await j.post("/api/user/register",u,{withCredentials:!0});r.data.created?(t(!1),a.success(r.data.message),c()):r.data.created.error_type===0?a.error(r.data.error[0].msg):r.data.error_type===1&&a.error(r.data.message)}catch(r){console.log(r)}finally{m(!1)}},b=()=>{t(!1)},x=()=>{c(),t(!1)};return e.jsxs("div",{className:"fixed inset-0 flex p-3 xl:p-0 items-center justify-center bg-gray-800 bg-opacity-50 z-50 ",children:[e.jsx(w,{position:"bottom-right",autoClose:2e3,hideProgressBar:!1,newestOnTop:!1,closeOnClick:!0,rtl:!1,pauseOnFocusLoss:!0,draggable:!0,pauseOnHover:!0,theme:"light"}),e.jsxs("form",{onSubmit:p,className:"forgot-password xl:w-1/3 lg:w-1/2 sm:w-full md:w-1/2  w-full  p-3 text-[12px]   rounded-lg shadow-md bg-white  transition duration-500 ease-in-out border-2 border-transparent ",children:[e.jsx("h2",{className:"text-center text-2xl mt-3 mb-3",children:"Register"}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"fullName",className:"block text-sm font-medium text-gray-700",children:"Full Name"}),e.jsx("input",{ref:o,type:"text",id:"fullName",className:"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-pink-500",placeholder:"Enter fullname",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx("input",{ref:l,type:"email",id:"email",className:"mt-1 p-2 block w-full border  border-gray-300 rounded-md focus:outline-none focus:border-pink-500",placeholder:"Enter email",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"PhoneNumber"}),e.jsx("input",{ref:d,type:"number",id:"phonenumber",className:"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-pink-500",placeholder:"Enter phonenumber",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),e.jsx("input",{ref:n,type:"password",id:"password",className:"mt-1 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-pink-500",placeholder:"Enter password",required:!0})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("label",{htmlFor:"confirmPassword",className:"block text-sm font-medium text-gray-700",children:"Confirm Password"}),e.jsx("input",{ref:i,type:"password",id:"confirmPassword",className:"mt-1 mb-4 p-2 block w-full border border-gray-300 rounded-md focus:outline-none focus:border-pink-500",placeholder:"Enter confirmPassword",required:!0})]}),e.jsxs("button",{type:"submit",className:"flex items-center gap-3 justify-center w-full mb-4  border border-gray-300 hover:text-white  hover:bg-[#891980] py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105",children:["Register",f&&e.jsx(y,{className:"animate-spin"})]}),e.jsx("button",{onClick:b,className:"w-full text-[12px] bg-[#891980] hover:bg-[#891980] text-white py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105",children:"Back"}),e.jsx("div",{className:"flex justify-end mt-2 text-[12px] ",children:e.jsx("a",{onClick:x,className:"cursor-pointer",children:"Login here"})})]})]})};export{R as default};
