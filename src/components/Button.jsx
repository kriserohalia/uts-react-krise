// eslint-disable-next-line react/prop-types
export default function Button({ variant = "filled", className, ...props }) {
    return (
      <button
        className={`button ${variant && `button-${variant}`} ${className}`}
        {...props}
      />
    );
  }