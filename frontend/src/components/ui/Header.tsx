// components/Header.tsx
import { Link } from "react-router-dom";
// import { FaUtensils } from "react-icons/fa"; // アイコンライブラリ (react-icons) を使用

const Header = () => {
  return (
    <header 
      className="w-full py-6 bg-gradient-to-b from-[#F7E4D0] to-[#F9F6F1] text-center mb-8 shadow-md font-sans"
      style={{
        margin: "0 auto", // 中央寄せ
        padding: "20px 0", // 上下余白
      }}
    >
      {/* タイトルとロゴ */}
      <div className="flex items-center justify-center gap-2">
        {/* <FaUtensils className="text-[#66BB6A] text-4xl" /> アイコン */}
        <Link 
          to="/" 
          className="text-[#66BB6A] text-4xl font-extrabold font-sans hover:text-[#558B2F] transition-colors font-sans"
        >
          Dishtiny
        </Link>
      </div>
      
      {/* サブタイトル */}
      {/* <p className="text-sm text-gray-600 mt-2 font-light">
        Cook creatively with your leftover ingredients
      </p> */}
    </header>
  );
};

export default Header;
