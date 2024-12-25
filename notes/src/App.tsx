import { useState, useEffect } from 'react'
import './App.css'
import { UserToken, Note } from './types'
import { LoginBlock } from './components/LoginBlock';
import { LogoutBlock } from './components/LogoutBlock';
import { NotesBlock } from './components/NotesBlock';
import axios, {AxiosResponse, AxiosError} from "axios";
import { AddNoteBlock } from './components/AddNoteBlock';
import { useCookies } from 'react-cookie';

axios.defaults.withCredentials = true;

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['username', 'token']);
  const [userToken, setUserToken] = useState<UserToken>({ username: "", token: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);

  console.log(cookies.username);
  const toggleDarkMode = () => {setDarkMode(!darkMode)};
  
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleThemeChange = () => {
      if (darkModeMediaQuery.matches) {
        setDarkMode(true);
      } else {
        setDarkMode(false);
      }
    };

    darkModeMediaQuery.addEventListener("change", handleThemeChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleThemeChange);
  }, []);
  
  useEffect(() => {
    if (userToken.username === "") {
      setNotes([]);
    } else {
      const updateNotes = async () => {
        const response: AxiosResponse<Note[]> | AxiosError = await axios.get("http://localhost:3000/api/notes").catch(error => error);
        if (response.status === 200) {
          setNotes(response.data);
        } else {
          setNotes([]);
        }
      };
      void updateNotes();
    }
  }, [userToken.username]);
  
  return (
    <div className="grid grid-rows-auto prose">
      <div className='grid grid-cols-2'>
        <div>
          <h1 className='flex'>Notes</h1>
        </div>
        <div>
          <label className="flex justify-end cursor-pointer gap-2">
            <span className='label-text'>light/dark theme</span>
            <input type="checkbox" value="luxury" checked={darkMode} className="toggle theme-controller" onChange={toggleDarkMode}/>
          </label>
        </div>
      </div>
      <div>
        <LoginBlock setUserToken={setUserToken} />
        <LogoutBlock userToken={userToken} setUserToken={setUserToken} />
        <NotesBlock notes={notes} />
        <AddNoteBlock userToken={userToken} />
      </div>
    </div>
  )
}

export default App
