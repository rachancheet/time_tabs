import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie';

export default function ok() {

  const [cookie, setcookie] = useCookies(["user"])
  if(typeof cookie.user == "undefined"){
    setcookie("user", {"name":" ","password":""}, {
      path: "/",
    })
  }

  const [fact, setfact] = useState([[]])
  // setfact(props.cs);
  const router = useRouter()
  const { cs } = router.query;

  // console.log(context)
  useEffect(() => {
    console.log(cs)
    axios.get(`http://127.0.0.1:5000/get_data/${cs}`).then((response) => {

      // console.log("data");
      // console.log(response.data);
      setfact(response.data)
    })

  }, [router])

  // setfact(tabs)
  // setcsrouter.query
  // let containerRef = useRef(null);
  // let gh = containerRef.children[0];`


  // return fact;


  function update_page(e) {
    e.preventDefault();
    // console.log("loda")
    router.push(`/update/${cs}`)
  }




  // ////console.log("loda")
  const weekday = ["MONDAYS", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"]
  const timings = ["8:50-9:40", "9:40-10:30", "10:30-11:20", "11:20-12:10", "12:10-1:00", "1:00-1:50", "1:50-2:40", "2:40-3:30", "3:30-4:20", "4:20-5:10"]




  const [input, setinput] = useState(1)
  // const [form, setform] = useState(fact)
  const [day, setday] = useState(0)
  const [dayview, setdayview] = useState([fact[0]])

  //  function handlechange(e){
  //   let name =e.target.name;
  //   setform({...form,
  //     [e.target.name]:[...e.target.name,e.target.value]})
  //     ////console.log(form);
  //   }
  // function handlesubmit(e){
  //   e.preventDefault();
  //   //console.log(fact);
  //   axios.post(`http://127.0.0.1:5000/post/${cs}`, {
  //       title: "sending data",
  //       baby:fact
  //     }).then((response) => {
  //       // setfact(response.data);
  //       console.log(response.data)

  //     }).catch(function (error) {
  //       console.log(error);
  //     });
  // }


  return (
    <>

<div className='flex h-screen justify-center items-center'>
<div className='flex p-10 shrink-0 align-center border-2 rounded-md border-[#e0f2fe]'>
      <div className='flex flex-col'>
        <div className='flex flex-row w-120 m-10 space-x-10'>

          {fact.map((name, index) => (

            <div className='flex flex-row items-center justify-center'>
              <table class="table-auto">
                <thead>
                  {weekday[index]}
                  <tr>
                    <th>Time</th>
                    <th>Class</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    name.map((nm, index2) => (

                      <tr>
                        <td>{timings[index2]}</td>
                        <td>{nm}</td>
                      </tr>

                    ))
                  }
                </tbody>
              </table>
            </div>
          ))}


        </div>


        <div className='flex flex-row-reverse w-120 m-10 space-x-10'>

          <form onSubmit={update_page}  >

            <button className='py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2'>
              edit
            </button>
          </form>
          <form onSubmit={(e) => {
            e.preventDefault()
            setcookie("user", { "name": " ", "password": "" }, {
              path: "/",
            })
          }}  >
            <button className='py-2 px-4 shadow-md no-underline rounded-full bg-[#16a34a] text-white font-sans font-semibold text-sm border-blue btn-primary hover:text-white hover:bg-blue-light focus:outline-none active:shadow-none mr-2'>
              sign out
            </button>
          </form>


        </div>
        {/* <div className='flex flex-row items-center justify-center'>
     <table class="table-auto">
  <thead>
    <tr>
      <th>Song</th>
      <th>Artist</th>
      <th>Year</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
    </tr>
    <tr>
      <td>Witchy Woman</td>
      <td>The Eagles</td>
      <td>1972</td>
    </tr>
    <tr>
      <td>Shining Star</td>
      <td>Earth, Wind, and Fire</td>
      <td>1975</td>
    </tr>
  </tbody>
</table>
</div> */}

      </div>
      </div>
      </div>

    </>
  )
}












