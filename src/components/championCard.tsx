import Image from "next/image";
import { IChampionDisplayedData } from "@/types/champions/champions";
import CircleProgressBar from "./circleProgressBar";

export default function ChampionCard({
  champion,
}: {
  champion: IChampionDisplayedData;
}) {
  function getKdaThreshold(kda: string) {
    switch (true) {
      case parseFloat(kda) <= 1.5:
        return "text-veryLow";
      case parseFloat(kda) <= 2.5:
        return "text-medium";
      case parseFloat(kda) <= 3.5:
        return "text-high";
      case parseFloat(kda) >= 4.5:
        return "text-veryHigh";
      default:
        return "";
    }
  }
  function getKPThreshold(kp: string) {
    switch (true) {
      case parseFloat(kp) < 40:
        return "text-veryLow";
      case parseFloat(kp) < 50:
        return "text-low";
      case parseFloat(kp) > 51:
        return "text-medium";
      case parseFloat(kp) > 70:
        return "text-veryHigh";
      default:
        return "";
    }
  }
  function csPerMinuteThreshold(csPerMinute: string) {
    switch (true) {
      case parseFloat(csPerMinute) < 3:
        return "text-veryLow";
      case parseFloat(csPerMinute) < 6:
        return "text-low";
      case parseFloat(csPerMinute) > 6:
        return "text-high";
      case parseFloat(csPerMinute) > 8:
        return "text-veryHigh";
      default:
        return "";
    }
  }
  function winRateThreshold(winRate: string) {
    switch (true) {
      case parseFloat(winRate)>=0 && parseFloat(winRate) <= 40:
        return "text-veryLow";
      case parseFloat(winRate) >= 41 && parseFloat(winRate) <= 50:
        return "text-medium";
      case parseFloat(winRate) >= 51 && parseFloat(winRate) <= 70:
        return "text-high";
      case parseFloat(winRate) >= 70 && parseFloat(winRate) <= 100:
        return "text-veryHigh";
      default:
        return "";
    }
  }
  const pickRate = (
    (champion.totalGames / champion.totalFetchedGames) *
    100
  ).toFixed(0);
  const kda =
    champion.deaths === 0
      ? ((champion.kills + champion.assists) / 1).toFixed(2)
      : ((champion.kills + champion.assists) / champion.deaths).toFixed(2);

  return (
    <div
      className={`shadow-md px-4 py-3 relative my-2 ${
        parseFloat(pickRate) > 49 ? `w-full` : "w-full"
      }`}
    >
      <div className="absolute inset-0 rounded-md overflow-hidden opacity-80">
        <Image
          src={champion.championBgImg}
          alt={champion.name}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className=" flex items-center gap-2 relative z-10 font-outfit text-white font-medium w-full ">
        <Image
          src={champion.championImg}
          alt={champion.name}
          width={30}
          height={30}
          className="rounded-full border-2 border-light-green "
        />
        <h1 className="uppercase font-black text-xl flex-1 line-clamp-1">
          {champion.name}
        </h1>
        <span className="font-light">W/R</span>
        <CircleProgressBar
          percentage={parseFloat(champion.winrate).toFixed(0)}
          color={winRateThreshold(champion.winrate)}
          size={42}
          isDiplayed={true}
        />
      </div>
      <div className="relative z-10 font-outfit text-white flex items-baseline ">
        <span className="uppercase font-bold text-2xl italic">
          {" "}
          {champion.totalGames}{" "}
        </span>{" "}
        <span className="text-base uppercase font-light flex-1 pl-2">
          {champion.totalGames < 2 ? "game" : "games"}
        </span>
        <div>
          <span className="px-2">PR</span>
          <span className="font-bold text-2xl italic">{pickRate}</span>
          <span className="italic font-bold">%</span>
        </div>
      </div>
      <div className="relative z-10 font-outfit text-white">
        <div className="flex flex-1 gap-2 pt-4">
          <span className="font-light italic">KDA</span>{" "}
          <span className="font-black ">
            {(Number(champion.kills) / Number(champion.totalGames)).toFixed(1)}
            &nbsp;/&nbsp;
            {(Number(champion.deaths) / Number(champion.totalGames)).toFixed(1)}
            &nbsp;/&nbsp;
            {(Number(champion.assists) / Number(champion.totalGames)).toFixed(
              1
            )}
          </span>
          <span className={`font-black ${getKdaThreshold(champion.kda)}`}>
            {kda}
          </span>
        </div>
        <div className="flex uppercase gap-1 items-center">
          <div className="flex pr-2">
            <span className="pr-2 italic">kp</span>
            <span
              className={`font-black pr-1 ${getKPThreshold(
                champion.killParticipation
              )}`}
            >
              {parseFloat(champion.killParticipation).toFixed(0)}
            </span>
            %
          </div>
          <circle className=" w-2 h-2 bg-red-500 rounded-full"></circle>
          <span
            className={`font-black ${csPerMinuteThreshold(
              champion.csPerMinute
            )}`}
          >
            {champion.csPerMinute}
          </span>{" "}
          <span className="italic">cs/min</span>
        </div>
      </div>
    </div>
  );
}
