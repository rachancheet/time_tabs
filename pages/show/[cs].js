import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Ok() {
  const [cookie, setcookie] = useCookies(["user"]);
  const [islogin, setislogin] = useState(0);

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
    if (cookie.user.name != " ") {
      setislogin(1);
    }
  }, []);

  const [fact, setfact] = useState([
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
    ["...", "...", "...", "...", "...", "..."],
  ]);
  const router = useRouter();
  const { cs } = router.query;

  // console.log(context)
  useEffect(() => {
    console.log(cs);
    axios
      .get(`https://api.rachancheet.me/times/get_data/${cs}`)
      .then((response) => {
        console.log(response.data);
        if (response.data[0][0] != "fail") {
          setfact(response.data);
        }
      });
  }, [router]);

  function update_page(e) {
    e.preventDefault();
    router.push(`/update/${cs}`);
  }

  const weekday = [
    "MONDAYS",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY",
  ];
  const timings = [
    "8:50-9:40",
    "9:40-10:30",
    "10:30-11:20",
    "11:20-12:10",
    "12:10-1:00",
    "1:00-1:50",
    "1:50-2:40",
    "2:40-3:30",
    "3:30-4:20",
    "4:20-5:10",
  ];

  const [input, setinput] = useState(1);
  const [day, setday] = useState(0);
  const [dayview, setdayview] = useState([fact[0]]);

  function handlepush() {
    router.push("/login");
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex p-10 shrink-0 align-center border-2 rounded-md border-[#e0f2fe]">
          <div className="flex flex-col">
            <div className="flex flex-row w-120 m-10 space-x-10">
              {fact.map((ng, index) => (
                <div key={index}>
                  <div className="font-bold">{weekday[index]}</div>
                  <div>
                    <hr className="text-white" />
                    <br />
                    {ng.map((n, i) => {
                      return (
                        <div key={i} className="flex flex-row m-2">
                          <div className="text-md">{timings[i]} : </div>
                          <div className="text-sm">{n}</div>
                          <br />
                          <hr />
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-row-reverse w-120 m-10 space-x-10">
              <form onSubmit={update_page}>
                <button className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                  edit
                </button>
              </form>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setislogin(0);
                  setcookie(
                    "user",
                    { name: " ", password: "" },
                    {
                      path: "/",
                    }
                  );
                }}
              >
                {islogin ? (
                  <button className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                    sign out
                  </button>
                ) : (
                  <button
                    onClick={handlepush}
                    className="py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2"
                  >
                    Log in
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
