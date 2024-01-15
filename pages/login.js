import appcontext from "../context/appcontext";
import { useContext, useState } from "react";
import axios from "axios";
// import { redirect } from "next/dist/server/api-utils";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Log() {
  const router = useRouter();

  const [cookie, setcookie] = useCookies(["user"]);

  useEffect(() => {
    if (typeof cookie.user == "undefined") {
      setcookie(
        "user",
        { name: " ", password: "" },
        {
          path: "/",
        }
      );
    }
  });
  // if(router.isReady && typeof cookie.user != "undefined"&& cookie.user.name!=" "){
  //   console.log("loda")
  //     // router.push("/")

  //   }

  // console.log((k)?k.name:"")

  // console.log(cookie["user"]["name"])
  // console.log(cookie["user"]["password"])
  // if(router.isReady && context.login){
  //     // router.push("/")
  //   }

  const [msg, setmsg] = useState();
  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("https://api.rachancheet.me/times/login", {
        data: { name: e.target[0].value, password: e.target[1].value },
      })
      .then((res) => {
        console.log(res.data);
        document.getElementById("fam").reset();
        if (res.data.name == "fail") {
          setmsg("wrong credentials");
        } else {
          // console.log("loda")
          setcookie(
            "user",
            { name: res.data.name, password: res.data.password },
            {
              path: "/",
            }
          );
          // setcookie("user", {"name":" ","password":""}, {
          //   path: "/",
          // })

          router.push("/");
        }
      });
  }
  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex p-10 shrink-0 align-center border-2 rounded-md border-[#e0f2fe]">
          {/* <div className="grid h-screen place-items-center">
        <div className="rounded bg-gray-600 bg-opacity-30 align-items"> */}

          <form id="fam" onSubmit={handleSubmit}>
            <div className="w-3/5 m-10 flex flex-col gap-10 text-black">
              <input
                className="rounded"
                placeholder=" name"
                name="name"
              ></input>
              <input
                className="rounded"
                placeholder=" password"
                name="password"
              ></input>
              {msg && <text className="text-red-400 ">{msg}</text>}
              <button className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
