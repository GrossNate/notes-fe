import { NotesBlockProps, Note } from "../types";

const NoteRow = ({ note }: {note: Note }) => {
  return (
    <tr className="hover">
      <td>{note.content}</td>
      <td>{note.created_timestamp}</td>
    </tr>
  );
}

export const NotesBlock: React.FC<NotesBlockProps> = ({ notes }) => {
  return (
    <div>
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>Note preview</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {notes.map(note => (<NoteRow key={note.id} note={note}/>))}
        </tbody>
      </table>
    </div>
  );
}