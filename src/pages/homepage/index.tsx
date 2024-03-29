import PlayerCardComponent from '@/components/playerCard';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';
export default function HomePage() {
  const [playerInput, setPlayerInput] = useState('');
  const [players, setPlayers] = useState<string[]>([]);
  //  store the input value in the state players
  const handleAddPlayerCard = () => {
    console.log('add player card');
    setPlayers([...players, playerInput]);
  };

  return (
    <div className="flex h-screen w-full">
      <div className="w-1/4 min-w-[350px] bg-blue-gray h-full pt-10">
        <div className="flex items center px-8 py-5">
          <h1 className="uppercase text-white font-poppins text-5xl italic font-extrabold">
            players
          </h1>
          <button className="w-[42px] h-[42px] bg-light-green rounded-lg rotate-45 ml-auto">
            <EditOutlinedIcon className="text-white -rotate-45" />
          </button>
        </div>
        <div className="px-8 py-5">
          {/* input field */}
          <div className="relative gap-2  h-12 flex items-center  rounded-lg ">
            <input
              type="text"
              className="w-[320px] h-10  px-3 py-2 text-gray-400 rounded-lg ring-light-green ring-1 focus:outline-none focus:ring-2 focus:ring-light-green"
              placeholder="Game Name + #EX"
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
            />
            <span className="absolute top-2.5 inset-y-0 right-0 pr-4">
              <button>
                <SearchIcon
                  className="text-white rotate-90"
                  onClick={() => handleAddPlayerCard()}
                />
              </button>
            </span>
          </div>
        </div>
        {players.map((player) => (
          <div key={player} className="px-8 py-5">
            <PlayerCardComponent data={player} />
          </div>
        ))}
      </div>
    </div>
  );
}
