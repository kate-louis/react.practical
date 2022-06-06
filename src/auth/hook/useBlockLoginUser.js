import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AuthStatus } from "../../common/constant";

export default function useBlockLoginUser() {
  const history = useNavigate();
  const status = useSelector(state => state.auth.status);
  useEffect(() => {
    if(status === AuthStatus.Login) {
      history('/', { replace: true });
    }
  });
}
