import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchIcon from '@mui/icons-material/Search';
export default function HomePage() {
  return (
    <div className="flex h-screen w-full">
      <div className="w-1/4 min-w-[350px] bg-blue-gray h-full">
        <div className="flex items center px-8 py-5">
          <h1 className="uppercase text-white font-poppins text-5xl italic font-extrabold">
            players
          </h1>
          <button className="w-[42px] h-[42px] bg-light-green rounded-lg rotate-45 ml-auto">
            <EditOutlinedIcon className="text-white -rotate-45" />
          </button>
        </div>
        <div className="px-8 py-5">
          {/* add to card */}
          <div className="relative gap-2  h-12 flex items-center">
            <input
              type="text"
              className="w-[320px] h-10  px-3 py-2 bg-orange-400 rounded-lg"
              placeholder="Game Name + #EX"
            />
            <span className="absolute top-2.5 inset-y-0 right-0 pr-4">
              <button>
                <SearchIcon className="text-white rotate-90" />
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
