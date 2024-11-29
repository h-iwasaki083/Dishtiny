import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";
import Header from "@/components/ui/Header";

const HomePage = () => {
  const [inputValue, setInputValue] = useState({ a: "", i: "", u: "" });
  const [error, setError] = useState(false);

  const handleSearch = (e: React.MouseEvent) => {
    if (!inputValue.a && !inputValue.i && !inputValue.u) {
      setError(true); // エラーを表示
      e.preventDefault(); // ページ遷移を防ぐ
    } else {
      setError(false); // エラーなし
    }
  };

  // constconst HomePage = () => {
  // const [inputValue, setInputValue] = useState({ a: "", i: "", u: "" });
  // const [error, setError] = useState({ a: false, i: false, u: false }); // 各入力欄ごとのエラー状態
  // const inputRefs = {
  //   a: useRef<HTMLInputElement>(null),
  //   i: useRef<HTMLInputElement>(null),
  //   u: useRef<HTMLInputElement>(null),
  // };

  // // 食材の入力が完了したときに、次の入力欄にフォーカスを移動
  // const handleFocusNext = (field: "a" | "i" | "u") => {
  //   if (field === "a" && inputValue.a) {
  //     inputRefs.i.current?.focus(); // 食材1が入力されたら食材2にフォーカス
  //   } else if (field === "i" && inputValue.i) {
  //     inputRefs.u.current?.focus(); // 食材2が入力されたら食材3にフォーカス
  //   }
  // };

  // // エラーチェックとフォーカス移動
  // const handleSearch = (e: React.MouseEvent) => {
  //   let valid = true;
  //   const newError = { a: false, i: false, u: false };
    
  //   if (!inputValue.a) {
  //     newError.a = true;
  //     valid = false;
  //   }
  //   if (!inputValue.i) {
  //     newError.i = true;
  //     valid = false;
  //   }
  //   if (!inputValue.u) {
  //     newError.u = true;
  //     valid = false;
  //   }

  //   setError(newError); // エラー状態を更新

  //   if (!valid) {
  //     e.preventDefault(); // エラーがある場合、遷移を防ぐ
  //   }
  // };


  return (
    <div
      className="min-h-screen flex flex-col justify-start items-center bg-gradient-to-b from-[#FFF8E1] to-[#FFE0B2]"
    >
      <Header />
      {/* 元の入力フォーム、ボタン */}
      {/* <div className="container mx-auto px-4 max-w-screen-sm">
        <h1 className="text-lg font-bold">余った食材を入力してください</h1>
        <Input
          className="my-2"
          value={inputValue.a}
          onChange={(e) => setInputValue({ ...inputValue, a: e.target.value })}
        />
        <Input
          className="my-2"
          value={inputValue.i}
          onChange={(e) => setInputValue({ ...inputValue, i: e.target.value })}
        />
        <Input
          className="my-2"
          value={inputValue.u}
          onChange={(e) => setInputValue({ ...inputValue, u: e.target.value })}
        />

        <Button>
          <Link
            to="/list"
            state={{ test: [inputValue.a, inputValue.i, inputValue.u] }}
          >
            検索
          </Link>
        </Button>
      </div> */}

      {/*以下gpt入力フォーム*/}
      <div className="container mx-auto px-4 max-w-screen-sm rounded-lg p-6">
        <h1 className="text-2xl font-bold text-center text-[#4E342E] mb-4">
          余った食材を入力して下さい
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          例: トマト、じゃがいも、にんじん
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              食材1
            </label>
            <Input
              className="w-full mt-1"
              value={inputValue.a}
              onChange={(e) =>
                setInputValue({ ...inputValue, a: e.target.value })
              }
            />
            {/* 入力制御 */}
            {/* <Input
              className="w-full mt-1"
              value={inputValue.a}
              onChange={(e) => {
                setInputValue({ ...inputValue, a: e.target.value });
                handleFocusNext("a"); // 食材1が入力されたら次に進む
              }}
              onBlur={() => setError({ ...error, a: !inputValue.a })}
              ref={inputRefs.a}
            />
            {error.a && <p className="text-sm text-red-600">食材1を入力してください</p>} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              食材2
            </label>
            <Input
              className="w-full mt-1"
              value={inputValue.i}
              onChange={(e) =>
                setInputValue({ ...inputValue, i: e.target.value })
              }
            />
            {/* 入力制御 */}
            {/* <Input
              className="w-full mt-1"
              value={inputValue.i}
              onChange={(e) => {
                setInputValue({ ...inputValue, i: e.target.value });
                handleFocusNext("i"); // 食材2が入力されたら次に進む
              }}
              onBlur={() => setError({ ...error, i: !inputValue.i })}
              ref={inputRefs.i}
            />
            {error.i && <p className="text-sm text-red-600">食材2を入力してください</p>} */}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              食材3
            </label>
            <Input
              className="w-full mt-1"
              value={inputValue.u}
              onChange={(e) =>
                setInputValue({ ...inputValue, u: e.target.value })
              }
            />
            {/* 入力制御 */}
            {/* <Input 
              className="w-full mt-1"
              value={inputValue.u}
              onChange={(e) => {
                setInputValue({ ...inputValue, u: e.target.value });
              }}
              onBlur={() => setError({ ...error, u: !inputValue.u })}
              ref={inputRefs.u}
            />
            {error.u && <p className="text-sm text-red-600">食材3を入力してください</p>} */}
          </div>
        </div>
        {error && (
          <p className="text-sm text-red-600 mt-4">
            エラー: 食材を入力してください
          </p>
        )}
        <Link
        to="/list"
        state={{ test: [inputValue.a, inputValue.i, inputValue.u] }}
      >
        <button
          onClick={handleSearch}
          className="w-full mt-6 py-2 bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] font-bold rounded-md shadow-lg transition duration-200"
        >
          検索
        </button>
      </Link>
      {/* 入力制御ボタン */}
      {/* エラーがない場合のみ遷移 */}
      {/* <Link to="/list" state={{ test: [inputValue.a, inputValue.i, inputValue.u] }}>
          <Button
            onClick={handleSearch} // 検索ボタンのクリック時にエラーチェック
            className="w-full mt-6 py-2 bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] font-bold rounded-md shadow-lg transition duration-200"
          >
            検索
          </Button>
        </Link> */}

        {/* <Button
          onClick={handleSearch}
          className="w-full mt-6 py-2 bg-[#A5D6A7] hover:bg-[#66BB6A] text-[#2E7D32] font-bold rounded-md shadow-lg transition duration-200"
        >
          {/* <Link
            to="/list"
            state={{ test: [inputValue.a, inputValue.i, inputValue.u] }}
          >
            検索
          </Link> */}
          {/* 検索
        </Button> */} 
      </div>
    </div>
  );
};
export default HomePage;
