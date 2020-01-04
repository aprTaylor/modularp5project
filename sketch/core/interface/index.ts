import Package from "../package";

export interface Draw {
  draw: (pack?: Package) => void
}