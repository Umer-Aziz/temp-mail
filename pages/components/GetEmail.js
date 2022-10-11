import React  from "react";
import { toast , Zoom  } from 'react-toastify';
import { IoIosCopy , IoMdRefresh } from "react-icons/io"
import { MdDeleteSweep , MdEditNote , MdAlternateEmail  } from "react-icons/md";
import { useContext } from "react";
import EmailContext from "../context/emailContext";
const GetEmail  = () => {
    const data = useContext(EmailContext);
    const inputEmail = React.useRef();
 
    let {tempmail , setEmail , setMailItem, getEmailData  , ReadEmailData} = data;
    // function copy Email

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

   return (
        <>
            
            <section>    
            {/* email copy Box  */}
                <div className="py-4 col-md-6 mx-auto">
                    <div className="py-4 px-2 border-dashed border-danger rounded">
                        <h1 className="h5 text-center font-boo">Your Temporary Email Address</h1>
                        <form action="" className="d-flex justify-content-center">
                            <div className="my-3 px-md-2 d-flex justify-content-between align-items-center input-box row">
                                <input readOnly className='col-10 input-email text-light text-center' placeholder={tempmail.email ? tempmail.email : `Generate Your Email! `} ref={inputEmail}/>
                                <div className="col-2">
                            { !tempmail.email ? <button title="Generate Email" id="btnEmail" onClick={getEmailData} className="rounded-circle bg-danger btnCircle" type="button">
                                <MdAlternateEmail className="fs-3" />
                                    </button>:
                                    <button title="Copy"  id="btnCopy" onClick={copyText} className="rounded-circle bg-danger btnCircle" type="button">
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

        </>
       
        
    )
}

export default GetEmail