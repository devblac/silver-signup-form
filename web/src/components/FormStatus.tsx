import { useState, useEffect } from "react";

const FormStatus = ({ success, error, email }: {
    success: boolean;
    error: string;
    email?: string;
  }) => {
  const [open, setOpen] = useState(success);

  
  useEffect(() => {
    if (success) {
      setOpen(true);
      const t = setTimeout(() => setOpen(false), 4000);
      return () => clearTimeout(t);
    }
  }, [success]);


  return (
    <>
      <div id="form-status" aria-live="polite" className="sr-only">
        {success ? "Account created" : error ? error : ""}
      </div>
      
      <div className="error-slot">
        {error && (
          <div role="alert" className="error">
            {error}
          </div>
        )}
      </div>
      
      {success && open && (
        <div className="toast" role="status">
          <span className="emoji" aria-hidden>✅</span>
          <div className="msg">
            <strong>Account created</strong>
            {email && (
              <div className="muted">
                Signed up as <code>{email}</code>
              </div>
            )}
          </div>
          <button
            className="ghost"
            onClick={() => setOpen(false)}
            aria-label="Dismiss"
          >
            X
          </button>
        </div>
      )}
    </>
  );
}

export default FormStatus;
