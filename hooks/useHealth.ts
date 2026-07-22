import { changeApiState } from "@/redux/apiHealthCheck/healthCheckSlice";
import { RootState } from "@/redux/store";
import { getApiHealth } from "@/service/apiHealthCheck";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useHealth = () => {
  const isApiUp = useSelector(
    (state: RootState) => state.healthCheckReducer.isApiUp,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function checkApiHealth() {
      const isUp = await getApiHealth();
      console.log("HEALTH IN Hook: ", isUp);
      dispatch(changeApiState(isUp));
    }

    checkApiHealth();
  }, [dispatch]);
  return isApiUp;
};

export default useHealth;
