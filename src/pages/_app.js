import '@/styles/globals.css'
import { useEffect, useState } from 'react'
import Nav from"../components/navbar"
import appcontext from '../context/appcontext'
import { useCookies } from 'react-cookie'
// import { useEffect } from 'react'
import { CookiesProvider } from "react-cookie"

export default function App({ Component, pageProps }) {

  const [cookie, setcookie] = useCookies(["user"])
  

  
  
     // data={
  //   color:[],
  //   qty:[]
  // }
  // const [data, setdata] = useState({
  //   color:["red"],
  //   qty:[5]
  // })
  // function add_data(color,qty){
  //     qty = Number(qty)
  //     let ls = {}
  //     ls = data;
  //     let index;
  //     if(data.color.includes(color)){

  //       const arr =data.color 
  //       index = arr.indexOf("red")
  //       ls.qty[index] += qty;  

  //     }
  //     else{
  //       ls.color.push(color)
  //       ls.qty.push(qty)
  //     }

  //     setdata(ls)
  //     console.log(data)
  // }
  // const [login, setlogin] = useState(0)
  // const [name, setname] = useState("")
  
  // const [password, setpassword] = useState("")
  
  // console.log(cookie)
  // const [cookie,setcookie]= useCookies(["cookie"])
  // const [user, setuser] = useState({"name":"rachan","password":"raxx"})




  // function setlogin(name,password){
    // setCookie("user", JSON.stringify(user), {
    //   path: "/"
    // })
  //   setuser({"name":name,"password":password});
  // }



  return(
    <CookiesProvider>
     <Component {...pageProps}/>
     </CookiesProvider>
     )


}
