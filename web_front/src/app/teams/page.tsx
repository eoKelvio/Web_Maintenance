
import Line from "@/components/line";
import TeamRegister from "@/components/team/team-register";
import { Maintenance, columns } from "./columns";
import TeamCarrousel from "@/components/team/teams-carrousel";


export default async function Teams() {

  return (
    <div className="flex flex-col min-h-screen">
      <div className="container mx-auto flex justify-between mt-5">
        <h1 className="title">Gerencias Equipes</h1>
        <div className="flex gap-4">
          <TeamRegister />
        </div>
      </div>
      <Line />
      <div className="flex-grow container mx-auto my-10 flex justify-center items-center">
        <TeamCarrousel/>
      </div>
    </div>
  );
}
