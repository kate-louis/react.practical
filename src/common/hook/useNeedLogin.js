import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { AuthStatus } from "../constant";

export default function useNeedLogin() {
  const history = useNavigate();
  const status = useSelector(state => state.auth.status);
  useEffect(() => {
    if(status === AuthStatus.NotLogin) {
      history('/login', { replace: true });
    }
  }, [status, history]);
}
