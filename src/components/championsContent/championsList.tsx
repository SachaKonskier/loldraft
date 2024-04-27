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

interface IProps {
  data: any;
  pickRate: any;
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
  pickRate,
  position,
  player,
}: IProps) {
  const positionSvg = positionSvgMap[position.toUpperCase()] || topSvg;

  return (
    <div className="w-full  h-full bg-darkGray p-12 overflow-y-scroll">
      <div className="relative px-8 py-5 grid grid-cols-2 gap-4 w-full h-auto bg-blue-gray rounded-lg">
        <div className="flex items-center absolute gap-4 -top-4 -left-2">
          <Image
            src={positionSvg}
            alt="My SVG"
            width={32}
            height={32}
            className=" bg-gray-400/40 rounded-md"
          />
          <p className=" uppercase text-white font-outfit text-xl italic font-semibold">
            {player.gameName}
          </p>
        </div>
        {data &&
          Object?.keys(data).map((champion) => (
            <div
              className={`${
                parseFloat(pickRate(data[champion])) > 33 ? "col-span-2" : ""
              }`}
              key={data[champion].id}
            >
              <ChampionCard champion={data[champion]} />
            </div>
          ))}
      </div>
    </div>
  );
}
