import "./App.css";
import Search from "./components/Search";
import NoteList from "./components/NoteList";
import NoteInput from "./components/NoteInput";

function App() {
  return (
    <div className="container vw-100 min-vh-100 bg-light px-1 py-5 mb-5">
      <h1 className="mt-5">DoodleDen</h1>
      <p className="mb-5">jot the day away....</p>
      <Search />
      <hr className="my-4" />
      <NoteList />
      <NoteInput />
    </div>
  );
}

export default App;
