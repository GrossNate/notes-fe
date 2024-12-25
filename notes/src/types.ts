export interface UserToken {
  username: string;
  token: string;
}

export interface LoginBlockProps {
  setUserToken: React.Dispatch<React.SetStateAction<UserToken>>;
}

export interface LogoutBlockProps extends LoginBlockProps {
  userToken: UserToken;
}

export interface AddNoteBlockProps {
  userToken: UserToken;
}

export interface NotesBlockProps {
  notes: Note[];
}

export interface Note {
  id: string;
  username: string;
  content: string;
  created_timestamp: string;
}