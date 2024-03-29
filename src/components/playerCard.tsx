import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import svgTop from '../../public/top.svg';
import Image from 'next/image';
import { useState } from 'react';
export default function PlayerCardComponent({ data }: { data: string }) {
  const [playerInput, setPlayerInput] = useState('');
  const [subAccounts, setSubAccounts] = useState<string[]>([]);
  const handleSubAccountOnClick = () => {
    setSubAccounts([...subAccounts, playerInput]);
  };
  return (
    <div className="w-[320px] max-h-[220px] h-auto rounded-lg ring-light-green ring-1 p-3 bg-gradient-to-br via-white/40 from-light-green overflow-x-auto">
      <div className="text-white font-semibold justify-center flex">
        <Image src={svgTop} alt="My SVG" width={24} height={24} />
        <span className="pl-4">{data}</span>
        <span className="ml-auto">
          <VisibilityOutlinedIcon />
        </span>
      </div>
      {subAccounts.map((account) => (
        <div key={account} className="px-8 py-5">
          {account}
        </div>
      ))}
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
              onClick={() => handleSubAccountOnClick()}
            />
          </button>
        </span>
      </div>
    </div>
  );
}
