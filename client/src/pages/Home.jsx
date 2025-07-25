import { useNavigate } from "react-router-dom";
import Header from "../components/ui/Header";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="p-4">
        <h1 className="text-xl font-bold mb-4">Welcome to the Home Page</h1>
      </div>
    </>
  );
}
