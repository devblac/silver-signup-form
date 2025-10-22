const FormStatus = ({
  success,
  error,
}: {
  success: boolean;
  error: string;
}) => (
  <>
    <div id="form-status" aria-live="polite" className="sr-only">
      {success ? "Account created" : error ? error : ""}
    </div>
    {error && (
      <div role="alert" className="error">
        {error}
      </div>
    )}
    {success && <div className="success">Account created (mock)</div>}
  </>
);

export default FormStatus;
