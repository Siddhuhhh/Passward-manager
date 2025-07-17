import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const imgRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [visible, setVisible] = useState(false);
  const [passwordArray, setPasswordArray] = useState([]);

  useEffect(() => {
    const passwords = localStorage.getItem("passwords");
    if (passwords) {
      setPasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copytext = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Copied to clipboard!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch(() => {
        toast.error("Failed to copy.");
      });
  };

  const showpass = () => {
    const newVisible = !visible;
    setVisible(newVisible);
    imgRef.current.src = newVisible ? "icons/eyecross.png" : "icons/eye.png";
  };

  const deletepass = (idToDelete) => {
    const updatedPasswords = passwordArray.filter((item) => item.id !== idToDelete);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));
    toast.success("Password deleted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  };

  const editpass = (id) => {
    const passwordToEdit = passwordArray.find(item => item.id === id);
    if (!passwordToEdit) return;

    setForm({
      site: passwordToEdit.site,
      username: passwordToEdit.username,
      password: passwordToEdit.password,
    });

    const updatedPasswords = passwordArray.filter(item => item.id !== id);
    setPasswordArray(updatedPasswords);
    localStorage.setItem("passwords", JSON.stringify(updatedPasswords));

    toast.info("Loaded entry for editing", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
      transition: Bounce,
    });
  };

  const savepass = () => {
    if(form.site.length>3&&form.username.length>3&&form.password.length>3){
    const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
    setPasswordArray(newPasswordArray);
    localStorage.setItem("passwords", JSON.stringify(newPasswordArray));
    setForm({ site: "", username: "", password: "" });
    toast.success("Password saved!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }
  else{
     toast.success("Invalid entry!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
      transition: Bounce,
    });
  }
  };

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <>
      <ToastContainer />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="mx-auto px-4 md:px-8 lg:px-40 py-16 max-w-6xl">
        <h1 className="text-4xl font-bold text-center">
          <span className="text-green-500">&lt;</span>
          <span>Pass</span>
          <span className="text-green-500">OP/&gt;</span>
        </h1>
        <p className="text-green-900 text-lg text-center">Your Own Password</p>

        <div className="text-white flex flex-col gap-4 p-4 w-full">
          <input
            value={form.site}
            onChange={handlechange}
            placeholder="Enter website URL"
            className="rounded-full border border-green-500 p-4 py-2 text-black w-full"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              value={form.username}
              onChange={handlechange}
              placeholder="Username"
              className="w-full md:w-1/2 rounded-full border border-green-500 p-4 py-2 text-black"
              type="text"
              name="username"
              id="username"
            />

            <div className="relative w-full md:w-1/2">
              <input
                value={form.password}
                onChange={handlechange}
                placeholder="Password"
                className="w-full rounded-full border border-green-500 p-4 py-2 text-black pr-16"
                type={visible ? "text" : "password"}
                name="password"
                id="password"
              />
              <span
                onClick={showpass}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-green-700 text-sm cursor-pointer"
              >
                <img ref={imgRef} width={20} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button
            onClick={savepass}
            className="bg-green-500 hover:bg-green-300 border flex justify-center items-center gap-2 text-white font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200 cursor-pointer"
          >
            <lord-icon
              src="https://cdn.lordicon.com/sbnjyzil.json"
              trigger="hover"
              colors="primary:#ffffff"
              style={{ width: "24px", height: "24px" }}
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords mt-10 mb-16 overflow-x-auto">
          <h2 className="font-bold text-2xl py-4">Your passwords</h2>
          {passwordArray.length === 0 ? (
            <div>No Passwords to show</div>
          ) : (
            <table className="table-auto w-full text-sm">
              <thead className="bg-green-400 text-white">
                <tr>
                  <th className="py-2 px-2">Site</th>
                  <th className="py-2 px-2">Username</th>
                  <th className="py-2 px-2">Password</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-white py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={item.site}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-700 underline"
                        >
                          {item.site}
                        </a>
                        <img
                          src="icons/copy-01-stroke-rounded.svg"
                          alt="Copy"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => copytext(item.site)}
                        />
                      </div>
                    </td>
                    <td className="border border-white py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.username}
                        <img
                          src="icons/copy-01-stroke-rounded.svg"
                          alt="Copy"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => copytext(item.username)}
                        />
                      </div>
                    </td>
                    <td className="border border-white py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {item.password}
                        <img
                          src="icons/copy-01-stroke-rounded.svg"
                          alt="Copy"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => copytext(item.password)}
                        />
                      </div>
                    </td>
                    <td className="border border-white py-2 px-2 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <img
                          src="icons/edit-04-stroke-rounded.svg"
                          alt="Edit"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => editpass(item.id)}
                        />
                        <img
                          src="icons/delete-02-stroke-rounded.svg"
                          alt="Delete"
                          className="w-4 h-4 cursor-pointer"
                          onClick={() => deletepass(item.id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;