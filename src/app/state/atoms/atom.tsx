"use client";
import { atom } from "recoil";

export const loadingState = atom({
  key: "loadingState",
  default: false, // Set your default loading state here
});
