import "./App.css";
import { Login } from "./components/Auth/LoginPage";
import { Signup } from "./components/Auth/SignupPage";
import { FileDetailsPage } from "./components/Details/FileDetailsPage";
import { HomePage } from "./components/Home/HomePage";
import { Navigation } from "./components/Navigation/Navigation";
import { UploadPage } from "./components/Upload/UploadPage";

function App() {
  return (
    <>
      <Navigation>
        <HomePage />
        <Signup />
        <Login />
        <UploadPage />
      </Navigation>
      <FileDetailsPage />
    </>
  );
}

export default App;
