import Image from "next/image";
import { AiFillGithub } from "react-icons/ai";

const Footer = () => {
  return (
    <footer
      className="footer items-center p-4"
      style={{
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px, rgba(17, 17, 26, 0.1) 0px 24px 80px",
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
        <p>Copyright © 2023 - All right reserved</p>
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
