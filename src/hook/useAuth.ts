import React, { Component, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";

export default function useAuth() {
  const initializing = useSelector(
    (state: RootState) => state.Auth.initializing
  );
  const initialized = useSelector((state: RootState) => state.Auth.initialized);
  const logInData = useSelector((state: RootState) => state.Auth.logInResponse);
  const accessTokenData = useSelector(
    (state: RootState) => state.Auth.accessTokenResponse
  );

  return {
    logInData,
    accessTokenData,
    initialized,
    initializing,
  };
}
