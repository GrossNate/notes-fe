import { useState } from "react";
import { LoginBlockProps, UserToken } from "../types";
import axios from "axios";
import { AxiosResponse } from "axios";
import { AxiosError } from "axios";
import { BASE_URL } from "../config";
const baseUrl = `${BASE_URL}/user/login`;

axios.defaults.withCredentials = true;

export const LoginBlock: React.FC<LoginBlockProps> = ({isLoggedIn}) => {
  const [input, setInput] = useState<{ username: string, clearPassword: string }>({ username: "", clearPassword: "" });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setInput({ ...input, [event.target.name]: event.target.value });
  }

  const handleLogin = async (event: React.MouseEvent) => {
    event.preventDefault();
    const response: AxiosResponse<UserToken> | AxiosError<{ error: string }> = await axios.post(baseUrl, input).catch((error) => error);
    if (response.status !== 200) {
      alert("Could not log in. Invalid username or password.");
    }
    setInput({username: "", clearPassword: ""});
  }

  return (
    <form>
      <div className={isLoggedIn ? "hidden" : "grid grid-cols-1 gap-2"}>
        <h2 className="w-full max-w-xs ">Login</h2>
        <input type="text" className="input input-bordered w-full max-w-xs" name="username" placeholder="username" value={input.username} onChange={handleChange} />
        <input type="password" className="input input-bordered w-full max-w-xs" name="clearPassword" placeholder="password" value={input.clearPassword} onChange={handleChange} />
        <input type="submit" className="btn btn-primary max-w-xs" value="log in" onClick={(event) => { void handleLogin(event) }} />
      </div>
    </form>
  );
}