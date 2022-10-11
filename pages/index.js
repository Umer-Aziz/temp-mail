import GetEmail from "./components/GetEmail";
import ReadEmail from "./components/ReadEmail";
import EmailSate from "./context/EmailState";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>

    <EmailSate>
    <ToastContainer toastStyle={{ backgroundColor: "#DC3545" }}/>
    <main className="container p-3">
      <GetEmail/>
      <ReadEmail/>
    </main>
    </EmailSate>
    </>
  )
}
