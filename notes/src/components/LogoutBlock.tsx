import { LogoutBlockProps } from "../types";
import axios from "axios";
import { BASE_URL } from "../config";

const baseUrl = `${BASE_URL}/user/logout`;

export const LogoutBlock: React.FC<LogoutBlockProps> = ({ userToken, setUserToken, isLoggedIn }) => {

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    setUserToken("");
    await axios.get(baseUrl).catch(error => error);

  }

  return (
    <div className={isLoggedIn ? "grid grid-cols-1 gap-2" : "hidden"}>
      <h2 className="flex w-full max-w-xs gap-2">
        <div>{userToken.username}</div>
        <div>
          <input type="submit" className="btn btn-secondary btn-xs" value="log out" onClick={handleLogout} />
        </div>
      </h2>
    </div>
  );
}