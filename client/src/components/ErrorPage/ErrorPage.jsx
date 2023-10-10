import style from "./ErrorPage.module.css";
import errorImage from "../../assets/dog_404.jpg";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <div className={style.container}>
      <img src={errorImage} alt="ERROR 404" className={style.error} />
      <button onClick={handleClick} className={style.buttonBack}>
       
        Back
      </button>
    </div>
  );
};

export default ErrorPage;