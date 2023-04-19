import Dashboard from "./Dashboard";
import { useQuery } from "react-query";
import axios from "axios";

export default function Home() {
  return (
    <div className="flex justify-center">
      <div className="w-4/5	">
        <Dashboard />
      </div>
    </div>
  );
}
