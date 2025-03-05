import { styles } from "@/styles";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { create } from "zustand";
import { Text } from ".";
import colors from "tailwindcss/colors";

type PickerType = "year" | "month" | "date";
type Time = {
  show: boolean;
  type: PickerType;
  setTime: (time: Partial<Time>) => void;
  openTime: (time: Partial<Time>) => void;
  closeTime: () => void;
};
