import Content from "@/components/content";
import Navbar from "@/components/navbar";
import Provider from "@/lib/provider";

export default function Home() {
  return (
    <Provider>
      <Navbar />
      <Content />
    </Provider>
  );
}
