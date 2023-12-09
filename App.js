import AppNavigation from "./src/navigations/app.navigation";
import { NativeWindStyleSheet } from "nativewind";
import TabNavigation from "./src/navigations/tab.navigation";

NativeWindStyleSheet.setOutput({
  default: "native",
});


export default function App() {
  return (
    // <AppNavigation />
    <TabNavigation />
  );
}
