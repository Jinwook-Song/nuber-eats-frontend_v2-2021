interface IFormErrorProps {
  errorMessage: string;
}

function FormError({ errorMessage }: IFormErrorProps) {
  return <span className="font-medium text-red-500">{errorMessage}</span>;
}

export default FormError;
