import Content from "@/components/content";
import Navbar from "@/components/navbar";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <div>
      <Toaster />
      <Navbar />
      <Content />
    </div>
  );
}
