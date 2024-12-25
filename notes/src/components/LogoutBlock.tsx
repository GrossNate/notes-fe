import { LogoutBlockProps } from "../types";
import axios, {AxiosResponse, AxiosError } from "axios";
const baseUrl = "http://localhost:3000/api/user/logout";

export const LogoutBlock: React.FC<LogoutBlockProps> = ({ userToken, setUserToken }) => {

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    setUserToken({token: "", username: ""});
    await axios.get(baseUrl).catch(error => error);
    
  }

  return (
      <div className="grid grid-cols-1 gap-2">
        <h2 className="w-full max-w-xs ">{userToken.username}</h2>
        <input type="submit" className="btn btn-secondary max-w-xs" value="log out" onClick={handleLogout} />
      </div>
  );
}