import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="flex justify-between p-4"
      style={{
        boxShadow: "0px -4px 3px rgba(50, 50, 50, 0.10)",
      }}
    >
      <div className="items-center grid-flow-col">
        <Image
          className="rounded-full"
          width={28}
          height={28}
          src="/logo.png"
          alt="Logo"
        />
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
  );
};

export default Footer;
