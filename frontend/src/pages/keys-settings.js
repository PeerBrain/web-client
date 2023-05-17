import { useForm } from "react-hook-form";
import { useState, useEffect } from 'react';
//import HandleGenerateKeypair from "../components/keys";
import UploadKey from "../components/uploadkey";
function KeySettings() {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const privateKey = localStorage.getItem('private-key');
    const publicKey = localStorage.getItem('public-key');
    const symmetricKey = localStorage.getItem('symmetric-key');
    const [user, setUser] = useState(localStorage.getItem('username') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const onSubmit = data => UploadKey(data, token);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('https://mfa.peerbrain.net/api/v1/token-test', {
          method: 'GET',
          headers: {
            'token': `${token}`,
          },
        });
        if (!response.ok) {
            console.log(response.status);
          throw new Error(response.status);
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    }
    fetchData();
  }, [token]);

  if (loading) {
    return <div className='box'>Loading...</div>;
  }

  if (error) {
    return <div className='box'>Error: Please Login</div>;
  }
  return (
    <div className="box">
      <h1 className="title has-text-centered">Keys Settings</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            <button className="button is-primary" type="submit">Save</button>
            <button className="button is-primary" onClick={() => window.location.href = 'https://web.peerbrain.net/settings/keys/generate'}>Generate New Key</button>
            </div>
            
        
        </div>
        </form>    
    </div>
  );
}

export default KeySettings;