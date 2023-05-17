import { useForm } from "react-hook-form";
import ResetPassword from "../components/ResetPassword";
function ForgotPassword() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => ResetPassword(data);
    return (
        <div className="box">
            <h1 className="title has-text-centered">Reset Password</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label>
                    Username:
                    <input className="input" required type="text" name="username" {...register("username")} />
                </label>
                <button className="button is-primary" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ForgotPassword;