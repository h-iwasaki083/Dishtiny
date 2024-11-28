import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link } from "react-router";

const HomePage = () => {
  const [inputValue, setInputValue] = useState({ a: "", i: "", u: "" });

  return (
    <div>
      <h1>食べ物を入力してください</h1>
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
    </div>
  );
};
export default HomePage;
