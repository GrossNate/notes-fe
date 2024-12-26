import { ReactEventHandler } from "react";
import { NotesBlockProps, Note } from "../types";
import axios, { AxiosResponse, AxiosError } from "axios";
const baseUrl = "http://localhost:3000/api/notes";

axios.defaults.withCredentials = true;

const NoteRow = ({ note, deleteLocalNote, showEditor }: { note: Note, deleteLocalNote: (noteIdToDelete: Note["id"]) => void, showEditor: (noteToEdit: Note) => void }) => {
  const handleDeleteNote: ReactEventHandler = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const confirmDelete = confirm("Really delete?");
    if (confirmDelete) {
      const response: AxiosResponse | AxiosError = await axios.delete(`${baseUrl}/${note.id}`).catch(e => e);
      if (response.status === 204) {
        deleteLocalNote(note.id);
      } else {
        alert("Could not delete.");
      }
    }
  }
  return (
    <tr className="hover cursor-pointer select-none" onClick={() => showEditor(note)}>
      <td>
        {
          (note.content.length <= 50) ?
            note.content :
            note.content.slice(0, 47).concat("...")
        }
      </td>
      <td>{new Date(Date.parse(note.created_timestamp)).toLocaleString("en-US", { dateStyle: "short", timeStyle: "short" })}</td>
      <td>
        <button className="btn btn-secondary btn-xs" onClick={handleDeleteNote}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z" /></svg>
        </button>
      </td>
    </tr>
  );
}

export const NotesBlock: React.FC<NotesBlockProps> = ({ notes, isLoggedIn, deleteLocalNote, setIsAddModalOpen, showEditor }) => {
  return (
    <div className={isLoggedIn ? "" : "hidden"}>
      <h2 className="flex w-full max-w-xs gap-2">
        <div>Note list</div>
        <div>
          <button className="btn btn-primary btn-xs" onClick={() => { setIsAddModalOpen(true) }}>add note</button>
        </div>
      </h2>
      <div className="h-96 overflow-x-auto">
        <table className="table table-zebra table-pin-rows">
          <thead>
            <tr>
              <th>Note preview</th>
              <th>Created</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {notes.map(note => (<NoteRow key={note.id} note={note} deleteLocalNote={deleteLocalNote} showEditor={showEditor} />))}
          </tbody>
        </table>
      </div>
    </div>
  );
}