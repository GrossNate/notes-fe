export interface UserToken {
  username?: string;
  token?: string;
}

interface LoginStateDependentProps {
  isLoggedIn: boolean;
}

export interface LoginBlockProps extends LoginStateDependentProps {
}

export interface LogoutBlockProps extends LoginStateDependentProps {
  userToken: UserToken;
  setUserToken: React.Dispatch<React.SetStateAction<UserToken>>;
}

export interface AddNoteBlockProps extends LoginStateDependentProps {
  userToken: UserToken;
  appendLocalNote: (noteToAppend: Note) => void; 
}

export interface NotesBlockProps extends LoginStateDependentProps {
  notes: Note[];
  deleteLocalNote: (noteIdToDelete: Note["id"]) => void;
}

export interface Note {
  id: string;
  username: string;
  content: string;
  created_timestamp: string;
}