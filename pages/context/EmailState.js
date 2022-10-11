import { useState , useEffect } from "react";
import { toast , Zoom  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmailContext from "./emailContext";
import LoadingBar from 'react-top-loading-bar';

const EmailSate = (props)=>{

    const [tempmail, setEmail] = useState({});
    const [mailItem, setMailItem] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        getEmailData();
       }, []);

  const Toast = (text)=>{
    toast.info(text, {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme:"colored",
        transition: Zoom  
        
        });
}

  // === function api call for generating email 
  const getEmailData = async()=>{
    setProgress(60);
      const options = {
          method: 'POST',
          headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
              'X-RapidAPI-Host': 'temp-mail44.p.rapidapi.com'
          },
          // body: '{"key1":"value","key2":"value"}'
      };
      
    const response = await fetch('https://temp-mail44.p.rapidapi.com/api/v3/email/new', options)
          .then(async(res)=>{
              let data =await res.json();
              setEmail(data);
              setMailItem([]);
              setProgress(100);
              if(data.email){
                Toast(" 📩 Email has been Generated!");
              }
              else{
                Toast(" 📩 Limit Exceeded!");
              }

          })
          .catch(err => console.error(err));
          
  }
   //  ======== END =======

     // function  to readEmail 
     
     const ReadEmailData = async()=>{
        setProgress(33);
        const options = {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
                'X-RapidAPI-Host': 'temp-mail44.p.rapidapi.com'
            },
            // body: '{"key1":"value","key2":"value"}'
        };
    let mail = tempmail.email;
      const response = await fetch(`https://temp-mail44.p.rapidapi.com/api/v3/email/${mail}/messages`, options)
            .then(async(res)=>{
                let data =await res.json();
                setMailItem(data);
                setProgress(100);
                if(!data.message){ 
                  Toast("Refresh again to get emails");
                }

            })
            .catch(err => console.error(err));
    }
    //  ======== END =======
    return (
        <>
             <LoadingBar
        color='#f11946'
        progress={progress}
        waitingTime ={500}
        onLoaderFinished={() => setProgress(0)}
      />
     <EmailContext.Provider value={{Toast , tempmail , setEmail , mailItem , setMailItem , getEmailData  , ReadEmailData}}>
        {props.children}
     </EmailContext.Provider>
     </>
    )
}

export default EmailSate;