import { useForm } from "react-hook-form";
import GenerateKeypair from "../components/keys";
function TokenSettings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const privateKey = localStorage.getItem('private-key');
    const publicKey = localStorage.getItem('public-key');
    const symmetricKey = localStorage.getItem('symmetric-key');
  return (
    <div className="box">
      <h1 className="title has-text-centered">Token Settings</h1>
        <form>
        <div className="columns">
            <div className="field">
                <label className="label">Symmetric Key</label>
                    <input
                type="text"
                value={symmetricKey}
                placeholder="Enter Symmetric key"
                className="column input is-primary"
                required
                {...register("Symmetric")}
                />
                <label className="label">Public Key</label>
                <input
                type="text"
                value={atob(publicKey)}
                placeholder="Enter Public key"
                className="column input is-primary"
                required
                {...register("public")}
                />
                <label className="label">Private Key</label>
                <input
                type="text"
                value={atob(privateKey)}
                placeholder="Enter Private key"
                className="column input is-primary"
                required
                {...register("private")}
                />        
            </div>
            <button className="button is-primary" type="submit">Save</button>    
        
        </div>
        </form>    
    </div>
  );
}

export default TokenSettings;