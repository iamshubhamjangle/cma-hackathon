import Navbar from "@/components/navbar";

export default function Home() {
  const output = `Laborum adipisicing sunt dolor ullamco duis. Nisi nostrud nulla ea ad dolor incididunt ex minim laboris ad. Consequat amet nostrud mollit magna adipisicing occaecat do dolore quis anim. Id eu amet voluptate nisi sint duis consequat aute Lorem
Aliquip do nulla occaecat aliquip est proident dolor tempor ex. Culpa fugiat cupidatat nulla laboris magna quis sit. Eu adipisicing sint tempor cillum ut quis sunt enim eu pariatur magna. Nulla exercitation minim Lorem qui est voluptate. Nostrud amet cupidatat ut exercitation ea dolor est eiusmod laboris. Fugiat veniam proident in cupidatat Lorem ipsum est dolore officia sint incididunt consequat labore.

Laborum commodo deserunt aliqua cupidatat cillum dolor velit veniam esse deserunt ut magna non dolor. Culpa dolore tempor ex reprehenderit eiusmod voluptate quis dolor dolore qui aliqua voluptate. Adipisicing ullamco Lorem excepteur laboris sunt magna est et eu voluptate. Labore irure irure culpa aliquip aliqua velit ad laborum culpa aliquip aute aute non. Duis et esse commodo minim ea aliqua nostrud anim. Nostrud occaecat non consequat elit.
Irure excepteur dolore aute veniam commodo id laborum sit exercitation laborum reprehenderit consectetur quis qui. Aliquip incididunt laboris veniam commodo irure pariatur. Esse qui ad minim quis fugiat cupidatat quis cillum."
`;
  return (
    <div>
      <Navbar />
      <main className="px-8 md:px-20 mt-8">
        <div className="">
          <div className="min-h-16">
            <textarea
              placeholder="Type your query here..."
              className="textarea textarea-bordered textarea-primary w-full"
            ></textarea>
            <button className="btn btn-primary w-full">Send</button>
          </div>
          <div className="mt-8"></div>
          <div className="card shadow-md card-bordered border-primary">
            <div className="card-body">{output}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
