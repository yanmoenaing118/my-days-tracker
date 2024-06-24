import Calendar from "./components/Calendar";
import { fetchMydays } from "./utils/data";
export default async function  App() {
  const days = await fetchMydays();

  return (
    <div>
      <Calendar myDays={days} />
    </div>
  );
}
