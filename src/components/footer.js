import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <div
      className=""
      style={{
        boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.10)",
      }}
    >
      <footer className="flex justify-between max-w-7xl mx-auto p-4 sm:px-6 lg:px-8">
        <div className="items-center grid-flow-col">
          <Image width={32} height={32} src="/footerLogo1.png" alt="Logo" />
        </div>
        <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
          <a
            target="_blank"
            href="https://github.com/iamshubhamjangle/cma-hackathon"
            rel="noopener noreferrer"
          >
            <AiFillGithub size={28} />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
