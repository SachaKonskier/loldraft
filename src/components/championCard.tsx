import Image from "next/image";
import { IChampionDisplayedData } from "@/types/champions/champions";
//function for kda
// function for WR
// function for KP
// function for CS/M

export default function ChampionCard({
  champion,
}: {
  champion: IChampionDisplayedData;
}) {
    function getKdaThreshold(kda: string) {
        switch (true) {
            case parseFloat(kda) < 1.5:
                return 'text-veryLow';
              case parseFloat(kda) < 2.5:
                return 'text-medium';
              case parseFloat(kda) < 3.5:
                return 'text-high';
              case parseFloat(kda) > 4.5:
                return 'text-veryHigh';
            default:
                return "";
        }
    }
    function getKPThreshold(kp: string) {
        switch (true) {
            case parseFloat(kp) < 40:
                return 'text-veryLow';
              case parseFloat(kp) < 50:
                return 'text-low';
              case parseFloat(kp) > 51:
                return 'text-medium';
              case parseFloat(kp) > 70:
                return 'text-veryHigh';
            default:
                return "";
        }
    }
    function csPerMinuteThreshold(csPerMinute: string) {
        switch (true) {
            case parseFloat(csPerMinute) < 3:
                return 'text-veryLow';
              case parseFloat(csPerMinute) < 6:
                return 'text-low';
              case parseFloat(csPerMinute) > 6:
                return 'text-high';
              case parseFloat(csPerMinute) > 8:
                return 'text-veryHigh';
            default:
                return "";
        }
    }
  console.log(champion);
  return (
    <div className="h-52 min-w-[320px] max-w-[400px] shadow-md p-2 relative my-2">
      <div className="absolute inset-0 rounded-md overflow-hidden opacity-50">
        <Image
          src={champion.championBgImg}
          alt={champion.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="flex items-center gap-4 relative z-10 font-outfit text-white font-medium text-xl">
        <Image
          src={champion.championImg}
          alt={champion.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <h1 className="uppercase">{champion.name}</h1>
        <span>W/R {champion.winrate} %</span>
      </div>
      <div className="relative z-10">
        <span>number of games on this champion</span>
        <span>%age pick rate</span>
      </div>
      <div className="relative z-10 font-outfit text-white">
        <div className="flex flex-1">
          <span className="mx-2">
            KDA {champion.kills}/{champion.deaths}/{champion.assists}{" "}
          </span>{" "}
          (<span className={`px-1 ${getKdaThreshold(champion.kda)}`}>{champion.kda}</span>)
        </div>
        <span className={`space-x-2 mx-2 ${getKPThreshold(champion.killParticipation)}`}>{champion.killParticipation}</span> KP
        <span className={`space-x-2 mx-2  ${csPerMinuteThreshold(champion.csPerMinute)}`}>{champion.csPerMinute}</span> CS/Min
      </div>
    </div>
  );
}
