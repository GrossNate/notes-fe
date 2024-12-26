import { AddNoteBlockProps } from "../types";
import { useState } from "react";
import axios from "axios";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:3000/api/notes";

export const AddNoteBlock: React.FC<AddNoteBlockProps> = ({ userToken, appendLocalNote, isAddModalOpen, setIsAddModalOpen }) => {
  const [content, setContent] = useState<string>("");

  const handleAdd = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response: AxiosResponse | AxiosError = await axios.post(baseUrl, { content, username: userToken.username }).catch(e => e);
    if (response.status === 201) {
      // console.log(response);
      appendLocalNote(response.data)
      setContent("");
      setIsAddModalOpen(false);
    } else {
      alert("Could not add note.");
    }
  };
  
  const handleClose = (val = false) => {
    setContent("");
    setIsAddModalOpen(val);
  };

  return (
    <Dialog open={isAddModalOpen} onClose={handleClose} className="relative z-10">
      <DialogBackdrop transition className="fixed inset-0 bg-base-300/90 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel transition className="relative transform overflow-hidden rounded-lg bg-base-100 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <div className="bg-base-100 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                  <DialogTitle as="h3" className="text-base font-semibold text-base-content">
                    Add note
                  </DialogTitle>
                  <div className="mt-2 w-full">
                    <textarea name="content" value={content} onChange={e => setContent(e.target.value)} placeholder="note content" className="textarea textarea-bordered textarea-lg w-full" />
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-base-300 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 gap-2">
              <button className="btn btn-primary btn-sm inline-flex justify-center" onClick={e => { void handleAdd(e) }} >Add</button>
              <button onClick={() => handleClose()} className="btn btn-secondary btn-sm inline-flex justify-center">Cancel</button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};