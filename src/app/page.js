import Content from "@/components/content";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Provider from "@/lib/provider";

export default function Home() {
  return (
    <Provider>
      <div className="min-h-screen">
        <Navbar />
        <Content />
      </div>
      <Footer />
    </Provider>
  );
}
