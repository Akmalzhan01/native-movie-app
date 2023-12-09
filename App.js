import Home from "./src/Home";

import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
    <Home />
  );
}
