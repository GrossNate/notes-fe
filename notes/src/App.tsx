import { useState, useEffect } from 'react'
import './App.css'
import { UserToken, Note } from './types'
import { LoginBlock } from './components/LoginBlock';
import { LogoutBlock } from './components/LogoutBlock';
import { NotesBlock } from './components/NotesBlock';
import axios, {AxiosResponse, AxiosError} from "axios";
import { AddNoteBlock } from './components/AddNoteBlock';
import { useCookies } from 'react-cookie';
import { EditNoteBlock } from './components/EditNoteBlock';

axios.defaults.withCredentials = true;

function App() {
  const [cookies, setCookie] = useCookies(['username', 'token']);
  // const [userToken, setUserToken] = useState<UserToken>({ username: "", token: "" });
  const [notes, setNotes] = useState<Note[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [editorNote, setEditorNote] = useState<Note>({username: "", id: "", content: "", created_timestamp: ""});
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const toggleDarkMode = () => {setDarkMode(!darkMode)};
  
  const appendLocalNote = (noteToAppend: Note) => {
    setNotes(notes.concat(noteToAppend));
  };
  
  const updateLocalNote = (noteToUpdate: Note) => {
    setNotes(notes.map(note => (note.id === noteToUpdate.id) ? noteToUpdate : note));
  }
  
  const showEditor = (noteToEdit: Note) => {
    setEditorNote(noteToEdit);
    setIsEditModalOpen(true);
  }
  
  const deleteLocalNote = (noteIdToDelete: Note["id"]) => {
    setNotes(notes.filter(note => note.id !== noteIdToDelete));
  }

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
    if (cookies.username === "" || cookies.username === undefined) {
      setNotes([]);
      setIsLoggedIn(false);
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
      setIsLoggedIn(true);
    }
  }, [cookies.username]);
  
  return (
    <div className="grid grid-rows-auto prose">
      <div className='grid grid-cols-2'>
        <div>
          <h1 className='flex'>Notes</h1>
        </div>
        <div>
          <label className="flex justify-end cursor-pointer gap-2">
            <span className='label-text'>light/dark theme</span>
            <input type="checkbox" value="dim" checked={darkMode} className="toggle theme-controller" onChange={toggleDarkMode}/>
          </label>
        </div>
      </div>
      <div>
        <LoginBlock isLoggedIn={isLoggedIn} />
        <LogoutBlock userToken={cookies} setUserToken={(val) => {setCookie("username", val)}} isLoggedIn={isLoggedIn} />
        <NotesBlock notes={notes} isLoggedIn={isLoggedIn} deleteLocalNote={deleteLocalNote} setIsAddModalOpen={setIsAddModalOpen} showEditor={showEditor}/>
        <AddNoteBlock userToken={cookies} appendLocalNote={appendLocalNote} isAddModalOpen={isAddModalOpen} setIsAddModalOpen={setIsAddModalOpen} />
        <EditNoteBlock updateLocalNote={updateLocalNote} editorNote={editorNote} setEditorNote={setEditorNote} isEditModalOpen={isEditModalOpen} setIsEditModalOpen={setIsEditModalOpen} />
      </div>
    </div>
  )
}

export default App
