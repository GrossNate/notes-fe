import { AddNoteBlockProps } from "../types";
import { useState } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";

axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:3000/api/notes";

export const AddNoteBlock: React.FC<AddNoteBlockProps> = ({ userToken }) => {
  const [content, setContent] = useState<string>("");

  const handleAdd = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response: AxiosResponse | AxiosError = await axios.post(baseUrl, {content, username: userToken.username}).catch(e => e);
    if (response.status === 201) {
      setContent("");
    } else {
      alert("Could not add note.");
    }
  };
  
  return (
    <form>
      <div className="grid grid-cols-1 gap-2">
      <h2 className="w-full">Add Note</h2>
      <textarea name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="note content" className="textarea textarea-bordered textarea-lg w-full" />
      <input type="submit" className="btn btn-primary w-full" value="add note" onClick={e => {void handleAdd(e)}} />
      </div>
    </form>
  );
};