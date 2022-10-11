import GetEmail from "./components/GetEmail";
import { ToastContainer } from 'react-toastify';

export default function Home() {
  return (
    <>
    <ToastContainer toastStyle={{ backgroundColor: "#DC3545" }}/>
    <main className="container p-3">
      <GetEmail/>
    </main>
    </>
  )
}
