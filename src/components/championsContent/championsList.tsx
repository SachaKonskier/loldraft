// next
import Image from "next/image";
// Components
import ChampionCard from "../championCard";
// svg
import topSvg from "../../../public/top.svg";
import jungleSvg from "../../../public/jungle.svg";
import midSvg from "../../../public/middle.svg";
import adcSvg from "../../../public/adc.svg";
import supportSvg from "../../../public/support.svg";
// Types
import { IRefinedChampionDisplayedData } from "@/types/matches/matches";
// Store
import { usePlayersStore } from "@/providers/players-store-provider";

interface IProps {
  data: any;
  position: string;
  player: any;
}
const positionSvgMap: Record<string, string> = {
  TOP: topSvg,
  JUNGLE: jungleSvg,
  MIDDLE: midSvg,
  BOTTOM: adcSvg,
  UTILITY: supportSvg,
};

export default function ChampionsList({
  data,
  position,
  player,
}: IProps) {
  const { accounts} = usePlayersStore((state) => state);

  const positionSvg = positionSvgMap[position?.toUpperCase()] || topSvg;
  const pickRate = (data: IRefinedChampionDisplayedData) =>
    ((data.totalGames / data.totalFetchedGames) * 100 ).toFixed(0);
  return (
    <div className="w-full  h-full bg-darkGray py-6 px-4 ">
      <div className={`relative p-5 grid ${accounts.length > 2 ? 'grid-cols-1' : 'grid-cols-2'}  gap-4 w-full h-auto bg-blue-gray rounded-lg `}>
        <div className="flex items-center absolute gap-4 -top-4 -left-2">
          <Image
            src={positionSvg}
            alt="My SVG"
            width={32}
            height={32}
            className=" bg-gray-400/40 rounded-md"
          />
          <p className=" uppercase text-white font-outfit text-xl italic font-semibold">
            {player.mainAccount.gameName}
          </p>
        </div>
        
        {data &&
          Object?.keys(data).map((champion) => (
            <div
              className={`${
                parseFloat(pickRate(data[champion])) > 33 ? "col-span-2" : ""
              } overflow-hidden` }
              key={data[champion].id}
            >
              <ChampionCard champion={data[champion]} position={position}/>
            </div>
          ))}
      </div>
    </div>
  );
}
