interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

function Button({ canClick, loading, actionText }: IButtonProps) {
  return (
    <button
      className={`text-lg font-medium focus:outline-none text-white py-3 transition-colors ${
        canClick && !loading
          ? "bg-lime-600 hover:bg-lime-700"
          : "bg-gray-300 pointer-events-none"
      }`}
    >
      {loading ? "Loading..." : actionText}
    </button>
  );
}

export default Button;
