export const PrimaryButton: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}> = ({
  onClick,
  children,
  disabled = false,
  loading = false,
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`btn-primary ${className}`}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {loading ? (
        <div className="flex items-center gap-2">
          <div className="loading-spinner" />
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export const SecondaryButton: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}> = ({ onClick, children, disabled = false, className = "" }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`btn-secondary ${className}`}
      style={{
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
      }}
    >
      {children}
    </button>
  );
};

// StatusBadge Component
export const StatusBadge: React.FC<{
  status: "open" | "pending" | "closed";
  children: React.ReactNode;
}> = ({ status, children }) => {
  return <span className={`status-badge status-${status}`}>{children}</span>;
};

// Card Component
export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = "", onClick }) => {
  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      {children}
    </div>
  );
};

// Input Component
export const Input: React.FC<{
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  className?: string;
}> = ({
  value,
  onChange,
  placeholder,
  type = "text",
  disabled = false,
  className = "",
}) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`input ${className}`}
    />
  );
};

// ErrorMessage Component
export const ErrorMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="error-message">{children}</div>;
};

// SuccessMessage Component
export const SuccessMessage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className="success-message">{children}</div>;
};
