import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useCookies } from "react-cookie";

export default function Hey() {
  const router = useRouter();
  const [cookie, setcookie] = useCookies(["user"]);
  // console.log(cookie);

  useEffect(() => {
    if (typeof cookie.user == "undefined") {
      setcookie(
        "user",
        { name: " ", password: "" },
        {
          path: "/",
        }
      );
      router.push("/login");
    }
    if (router.isReady && cookie.user && cookie.user.name == " ") {
      router.push("/login");
    }
  }, []);

  const [fact, setfact] = useState([[]]);
  const { cs } = router.query;

  useEffect(() => {
    axios
      .post("https://api.rachancheet.me/times/login", {
        data: { name: cookie.user.name, password: cookie.user.password },
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.name == "fail") {
          setcookie(
            "user",
            { name: " ", password: "" },
            {
              path: "/",
            }
          );
          router.push("/login");
        } else {
          // setcookie(
          //   "user",
          //   { name: res.data.name, password: res.data.password },
          //   {
          //     path: "/",
          //   }
          // );
          // setcookie("user", {"name":" ","password":""}, {
          //   path: "/",
          // })
          // router.push("/");
        }
      });

    axios
      .get(`https://api.rachancheet.me/times/get_data/${cs}`)
      .then((response) => {
        // console.log(response.data);
        setfact(response.data);
      });
  }, [router]);
  // setfact(tabs)
  // setcsrouter.query
  // let containerRef = useRef(null);
  // let gh = containerRef.children[0];`

  // return fact;

  // function update_page(e){
  //   e.preventDefault();
  //   console.log("loda")
  //   router.push(`/update/${cs}`)
  // }

  // ////console.log("loda")
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

  // console.log("------\n",fact)
  // const [input, setinput] = useState(1)
  // const [form, setform] = useState(fact)
  const [day, setday] = useState(0);
  const [dayview, setdayview] = useState([]);

  function handlesubmit(e) {
    e.preventDefault();
    //console.log(fact);
    axios
      .post(`https://api.rachancheet.me/times/post/${cs}`, {
        title: "sending data",
        password: "jawed",
        baby: fact,
        log: cookie.name,
      })
      .then((response) => {
        // setfact(response.data);
        // console.log(response.data)
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
    router.push("/");
  }

  return (
    <>
      <div className="flex h-screen justify-center items-center">
        <div className="flex p-10 shrink-0 align-center border-2 rounded-md border-[#e0f2fe]">
          <div className="flex flex-col space-y-5">
            <form
              onChange={(e) => {
                // e.target.preventdefault();
                // //console.log(fact[e.target.value])
                setday(e.target.value);
                setdayview(fact[e.target.value]);
              }}
            >
              <label> Day: </label>
              <select className="rounded">
                {weekday.map((f, index) => {
                  return (
                    <option key={index} value={index}>
                      {" "}
                      {"|    " + f}
                    </option>
                  );
                })}
                ;
              </select>
            </form>
            <form onSubmit={handlesubmit}>
              <h1>
                <b>{weekday[day]}</b>
              </h1>
              <hr />
              <div className="flex flex-col my-4">
                {dayview.map((nm, index2) => (
                  <div key={index2} className="my-5">
                    {timings[index2]}:{" "}
                    <input
                      className="rounded text-black"
                      onChange={(e) => {
                        let copy = fact;
                        const l = e.target.value;
                        // console.log(fact," : ",e.target.name)
                        copy[day][e.target.name] = l;
                        // console.log(e.target.name,day)
                        setfact(copy);
                      }}
                      placeholder={" " + nm}
                      name={index2}
                    />
                  </div>
                ))}
              </div>
              <button className="my-8 py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2">
                submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
