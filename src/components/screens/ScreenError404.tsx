import { FC } from "react";
import { useNavigate } from "react-router-dom";

export const ScreenError404: FC = () => {
    const navigate = useNavigate()
    return (
        <div>
            Sahifa topilmadi
            <img
                src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-1932.jpg?w=740&t=st=1702911278~exp=1702911878~hmac=be7f96e2ac9a90a6fb2f9dc40fbffac8244797bf9be145da7d4d2fad0ddddb3c"
                alt="error page image" />

            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}