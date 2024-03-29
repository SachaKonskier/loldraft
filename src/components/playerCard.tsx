import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import svgTop from '../../public/top.svg';
import Image from 'next/image';
import { useState } from 'react';
export default function PlayerCardComponent({ data }: { data: string }) {
  const [playerInput, setPlayerInput] = useState('');
  const [subAccounts, setSubAccounts] = useState<string[]>([]);
  const handleSubAccountOnClick = () => {
    setSubAccounts([...subAccounts, playerInput]);
  };
  const deleteAccountOnClick = (account: string) => {
    setSubAccounts(subAccounts.filter((item) => item !== account));
  };
  return (
    <div className="w-[320px] max-h-[220px] h-auto font-outfit rounded-lg ring-light-green ring-1 p-3 bg-gradient-to-br via-white/40 from-light-green overflow-x-auto">
      <div className="text-white pb-2 justify-center flex">
        <Image src={svgTop} alt="My SVG" width={24} height={24} />
        <span className="pl-4 font-semibold">{data}</span>
        <span className="ml-auto">
          <VisibilityOutlinedIcon />
        </span>
      </div>
      {subAccounts.map((account) => (
        <div key={account} className="w-full py-2 pb-6 flex items-center">
          <p className="border-1 border-gray-400 h-auto w-full font-semibold text-white flex items-center">
            {account}
            <button
              className="ml-auto"
              onClick={() => deleteAccountOnClick(account)}
            >
              <CloseIcon className="text-red-600" />
            </button>
          </p>
        </div>
      ))}
      <div className="relative gap-2  h-auto flex items-center rounded-lg">
        <input
          type="text"
          className="w-[320px] h-10  px-3 py-2 text-gray-400 bg-gray-400/40 rounded-lg ring-light-green ring-1 focus:outline-none focus:ring-2 focus:ring-light-green"
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
