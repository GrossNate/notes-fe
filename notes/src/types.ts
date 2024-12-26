export interface UserToken {
  username?: string;
  token?: string;
}

interface LoginStateDependentProps {
  isLoggedIn: boolean;
}

type SetSomething<F> = React.Dispatch<React.SetStateAction<F>>;

export interface LoginBlockProps extends LoginStateDependentProps {
}

export interface LogoutBlockProps extends LoginStateDependentProps {
  userToken: UserToken;
  setUserToken: SetSomething<UserToken>;
}

export interface AddNoteBlockProps {
  userToken: UserToken;
  appendLocalNote: (noteToAppend: Note) => void;
  isAddModalOpen: boolean;
  setIsAddModalOpen: SetSomething<boolean>;
}

export interface EditNoteBlockProps {
  updateLocalNote: (noteToUpdate: Note) => void;
  editorNote: Note;
  setEditorNote: SetSomething<Note>;
  isEditModalOpen: boolean;
  setIsEditModalOpen: SetSomething<boolean>;
}

export interface NotesBlockProps extends LoginStateDependentProps {
  notes: Note[];
  deleteLocalNote: (noteIdToDelete: Note["id"]) => void;
  setIsAddModalOpen: SetSomething<boolean>;
  showEditor: (noteToEdit: Note) => void;
}

export interface Note {
  id: string;
  username: string;
  content: string;
  created_timestamp: string;
}