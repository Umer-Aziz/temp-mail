import React from 'react'
import Link from "next/link";
import { MdOutlineAlternateEmail } from "react-icons/md"
import { BsGithub , BsLinkedin } from "react-icons/bs"
const Navbar = () => {
  return (
    <>
    <nav className='border-md-bottom'>
      <div className="p-3 container d-flex justify-content-between align-items-center">
      <p className="mt-2 h4 text-center font-boo temp-mail text-white" style={{cursor:"pointer"}}><MdOutlineAlternateEmail className="mail-logo text-danger"/>TEMP<span className="text-danger border border-2 border-danger">MAIL</span></p>
    <div>
    <Link href="https://www.linkedin.com/in/umer-aziz-b13b841b2/"><a className="link-light me-4" target="_blank"><BsLinkedin className="fs-4 linkedin-icon"/></a></Link>
    <Link href="https://github.com/Umer-Aziz/temp-mail"><a className="link-light" target="_blank"><BsGithub className="fs-4 github-icon"/></a></Link>
    </div>
    </div>
    </nav>
    </>
  )
}

export default Navbar
