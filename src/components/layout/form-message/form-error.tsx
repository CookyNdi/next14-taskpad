import { FaTriangleExclamation } from "react-icons/fa6";

type FormErrorProps = {
  message?: string;
};

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-destructive/40 p-3 text-sm text-red-600">
      <FaTriangleExclamation className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
