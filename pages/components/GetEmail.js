import React  , {useState , useEffect} from "react";
import { IoIosCopy , IoMdRefresh , IoIosArrowForward } from "react-icons/io"
import { MdDeleteSweep , MdEditNote , MdAlternateEmail , MdClose } from "react-icons/md";
import Link from "next/link"
import { toast , Zoom  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingBar from 'react-top-loading-bar';

const customId = "custom-id-yes";

const GetEmail  = () => {
    const [show, setShow] = useState(false);
    const [progress, setProgress] = useState(0);
    const [tempmail, setEmail] = useState({});
    const [mailItem, setMailItem] = useState([]);
    const inputEmail = React.useRef();
     // function copy Email

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
            transition: Zoom , 
            toastId: customId
            });
    }

    const copyText = ()=>{
        let CopyValue = inputEmail.current.placeholder;
         navigator.clipboard.writeText(CopyValue);
        Toast('📋  Text Copied!');
    }

    
    const Delete = ()=>{
    setEmail({});
    setMailItem([]);
    Toast("Email has been deleted!")
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
                  Toast("Refresh again to receive emails");
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

         {/* get Email  */}

            <section>    
            {/* email copy Box  */}
                <div className="py-4 col-md-6 mx-auto">
                    <div className="py-4 px-2 border-dashed border-danger rounded">
                        <h1 className="h5 text-center font-boo">Your Temporary Email Address</h1>
                        <form action="" className="d-flex justify-content-center">
                            <div className="my-3 px-md-2 d-flex justify-content-between align-items-center input-box row">
                                <input readOnly className='col-10 input-email text-light text-center' placeholder={tempmail.email ? tempmail.email : `Generate Your Email! `} ref={inputEmail}/>
                                <div className="col-2">
                            { !tempmail.email ? <button title="Generate Email" id="btnEmail" onClick={getEmailData} className="rounded-circle bg-danger btnCircle text-white" type="button">
                                <MdAlternateEmail className="fs-3" />
                                    </button>:
                                    <button title="Copy"  id="btnCopy" onClick={copyText} className="rounded-circle bg-danger btnCircle text-white" type="button">
                                <IoIosCopy className="fs-3" /> 
                                    </button>}
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="my-4">
                        <p className="text-secondary">Forget about spam, advertising mailings, hacking and attacking robots. Keep your real mailbox clean and secure. Temp Mail provides temporary, secure, anonymous, free, disposable email address.</p>
                    </div>
                </div>

            {/* Button Box  */} 
            {tempmail.email &&  <div className="py-3 col-md-7 col-lg-9 mx-auto btn-box font-boo">
                 <button onClick={copyText} className="custom-btn d-flex justify-content-center align-items-center border-none py-3 px-4 px-md-5  rounded-pill border border-danger text-danger bg-transparent">
                    <IoIosCopy className="fs-5"/>
                    <span className="ms-2">Copy</span>
                  </button>
                  <button onClick={ReadEmailData} className="custom-btn rerfesh-btn d-flex justify-content-center align-items-center border-none py-3 px-4 px-md-5  rounded-pill border border-danger text-danger bg-transparent">
                    <IoMdRefresh className="fs-4 refresh-icon"/>
                    <span className="ms-2">Refresh</span>
                  </button>
                  <button onClick={getEmailData} className="custom-btn d-flex justify-content-center align-items-center border-none py-3 px-4 px-md-5  rounded-pill border border-danger text-danger bg-transparent">
                    <MdEditNote className="fs-4"/>
                    <span className="ms-2">Change</span>
                  </button>
                  <button onClick={Delete} className="custom-btn d-flex justify-content-center align-items-center border-none py-3 px-4 px-md-5  rounded-pill border border-danger text-danger bg-transparent">
                    <MdDeleteSweep className="fs-4"/>
                    <span className="ms-2">Delete</span>
                  </button>
  
                </div>
            }
            </section>

            {/* Read Email  */}

            <section className="my-4 my-md-5 col-md-7 mx-auto shadow">
                <div className="">
                    <div className="bg-danger p-3 d-flex justify-content-between align-items-center rounded-top font-boo text-white">
                        <p className="fs-6 d-none d-lg-block mb-0">Sender</p>
                        <p className="fs-6 d-none d-lg-block mb-0">Subject</p>
                        <p className="fs-6 d-none d-lg-block mb-0">View</p>
                        <h5 className="d-lg-none mb-0">INBOX</h5>
                    </div>
                    <div className="readBox rounded-bottom pb-1">

                        {/* No mail info */}

                        { mailItem.length == 0 ? <div className="d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "333px" }}>

                            <div className="loader">
                            </div>
                            <p className="fs-5 font-monospace mt-3">Your inbox is empty</p>
                            <p className="fs-6 font-monospace text-secondary">Waiting for incoming emails</p>
                        </div> :
                            <div className="mail-listItem" style={{ minHeight: "333px" }}>
                                <ul className="d-grid gap-3">

                                    {
                                      mailItem.message ?  <div className="p-2 p-md-5 link-warning"> <Link  href="https://rapidapi.com/calvinloveland335703-0p6BxLYIH8f/api/temp-mail44"><a target="_blank">{mailItem.message}</a></Link> </div> :  mailItem.map((info) => {

                                            {/* for name & email   */}
                                            let originalFrom = info.from;
                                            let extFrom = originalFrom.replace(('<'), '');
                                            let sFrom = extFrom.replace(('>'), '');
                                            let from = sFrom.replaceAll(('"'), '');

                                            {/* for name first letters */}
                                            let words = from.split(" ");
                                            let output = words.slice(0,2).join(" ");
                                            let name = output.split(' ').map(word => word[0]);
  
                                               
                                               {/* for date  */}
                                               {/* 2022-10-11T00:56:02.475946715Z */}
                                               let originalDate = info.created_at;
                                               let CurrentDate = originalDate.replace('T', " ");
                                               let Date = CurrentDate.slice(0,19);

                                            return (

                                                <li className="mail-lItem" key={info.id}>

                                                    {/*Email list Item  */}
                                                    <div onClick={() => { show == false ? setShow(true) : setShow(false) }}  className="shadow p-3 d-flex align-items-center justify-content-between mail-item shadow-sm">
                                                        <div className="col-lg-5">
                                                            <div className="d-flex">
                                                                <div className="dot"></div>
                                                                <div className="d-grid">
                                                                    <span className="fs-6">{from}</span>
                                                                    {/* <span className="text-secondary fw-semibold">umars25271997@gmail.com</span> */}
                                                                </div>
                                                            </div>
                                                            <div className="ms-4 d-lg-none">
                                                                <span style={{ opacity: "0.8" }}>{info.subject}</span>
                                                            </div>
                                                        </div>
                                                        <div className="ms-4 d-none d-lg-flex col-lg-4">
                                                            <span style={{ opacity: "0.8" }}>{info.subject}</span>
                                                        </div>
                                                        <div className="col-lg-2 d-flex justify-content-end">
                                                            <IoIosArrowForward className="fs-5 arrow-forward" />
                                                        </div>



                                                    </div>
                                                    {/* === END === */}
                                                    {/* Email detail   */}

                                                    {show && <div className="emailBody">
                                                        <div className="rounded">
                                                            <div className="">
                                                                <div className="p-3 me-2 d-flex justify-content-end font-boo">
                                                                    <button onClick={() => { setShow(false) }} className="fs-6 mb-0 btn-delete"><MdClose className="fs-4" /></button>
                                                                </div>
                                                                <div className="readBox rounded-bottom px-4" style={{ minHeight: "333px" }}>

                                                                    {/* Email name & Date */}
                                                                    <div className="d-xl-flex justify-content-between border-bottom border-secondary">
                                                                        <div className="d-flex email-info align-items-center">
                                                                            <figure className="col-2 user-icon fw-bold fs-6 d-flex align-items-center justify-content-center text-danger border border-2 border-secondary rounded-circle text-uppercase">{name}</figure>
                                                                            <div className="ms-4 mt-1 col-md-7">
                                                                                <p className="mb-1">{from}</p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="d-flex align-items-center py-3">
                                                                            <span className="fw-bold">Date: </span>
                                                                            {/* 08-10-2022 15:50:15 */}
                                                                            <span className="ms-2">{Date}</span>
                                                                        </div>
                                                                    </div>

                                                                    {/* Email subject */}
                                                                    <div className="d-flex align-items-center py-3 border-bottom border-secondary">
                                                                        <span className="fw-bold">Subject: </span>
                                                                        <span className="ms-2">{info.subject}</span>
                                                                    </div>

                                                                    {/* email body  */}
                                                                    <div className="py-3" style={{ minHeight: "290px", maxHeight: "350px" }}>
                                                                        <div>{info.body_text}</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>}


                                                </li>

                                            )
                                        })

                                    }

                                </ul>
                            </div>}

                    </div>
                </div>
            </section>

        </>
       
        
    )
}

export default GetEmail
