import { useContext, useState } from "react";
import Link from "next/link"
import { IoIosArrowForward } from "react-icons/io";
import { MdClose } from "react-icons/md";
import EmailContext from "../context/emailContext";
const ReadEmail = () => {
    const [show, setShow] = useState(false);
    const items = useContext(EmailContext);
    let { mailItem } = items;

    return (
        <>
            <section className="my-4 my-md-5 col-md-7 mx-auto shadow">
                <div className="">
                    <div className="bg-danger p-3 d-flex justify-content-between align-items-center rounded-top font-boo">
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

export default ReadEmail