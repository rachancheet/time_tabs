// import Head from 'next/head';
// import Image from 'next/image';
import React, { useEffect, useState, useRef, useContext } from "react";
import axios from "axios";
// import Link from 'next/link';
import { useRouter } from "next/router";
// import { resolve } from 'styled-jsx/css';
// import { NextResponse, NextRequest } from 'next/server'
// import appcontext from '../../context/appcontext';
// import { redirect } from 'next/dist/server/api-utils';
// import { getServerSession } from 'next-auth';
import { useCookies } from "react-cookie";

export default function Hello() {
  const router = useRouter();
  const [cookie, setcookie] = useCookies(["user"]);

  useEffect(
    (e) => {
      if (typeof cookie.user == "undefined") {
        setcookie(
          "user",
          { name: " ", password: "" },
          {
            path: "/",
          }
        );
        router.push("/login");
      } else if (cookie.user.name == " ") {
        router.push("/login");
      } else {
        const name = cookie.user.name;
        const password = cookie.user.password;
        axios
          .post("https://api.rachancheet.me/times/login", {
            data: { name: name, password: password },
          })
          .then((res) => {
            console.log(res.data);
            if (res.data.name == "fail") {
              router.push("/");
            }
          });
      }
    },
    [router]
  );

  // console.log("adwoj")

  const [fact, setfact] = useState([[]]);
  const { cs } = router.query;

  useEffect(() => {
    axios
      .get(`https://api.rachancheet.me/times/get_data/${cs}`)
      .then((response) => {
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
    "mondays",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
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
        log: cookie.user.name,
      })
      .then((response) => {
        // setfact(response.data);
        console.log(response.data);
        router.push("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <>
      <h1>fuck you</h1>

      <div className="flex flex-col space-y-5">
        <form
          onChange={(e) => {
            // e.target.preventdefault();
            // //console.log(fact[e.target.value])
            setday(e.target.value);
            setdayview(fact[e.target.value]);
          }}
        >
          <label> Day </label>
          <select>
            {weekday.map((f, index) => {
              return (
                <option key={index} value={index}>
                  {" "}
                  {f}
                </option>
              );
            })}
            ;
          </select>
        </form>
        <form onSubmit={handlesubmit}>
          <h1>{weekday[day]}</h1>
          {dayview.map((nm, index2) => (
            <div key={index2} className="flex flex-col">
              {timings[index2]}:{" "}
              <input
                onChange={(e) => {
                  let copy = fact;
                  const l = e.target.value;
                  // console.log(fact," : ",e.target.name)
                  copy[day][e.target.name] = l;
                  // console.log(e.target.name,day)

                  setfact(copy);
                }}
                placeholder={nm}
                name={index2}
              />
            </div>
          ))}
          <button className="bg-lime-400 text-black bg-repeat-round">
            submit
          </button>
        </form>
      </div>
    </>
  );
}
