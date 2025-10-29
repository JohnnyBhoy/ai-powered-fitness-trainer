const FormError = ({ error }: { error: string | number | null | undefined }) => {
    return error && <p className="text-red-500 text-sm animate-pulse">{error}</p>
}

export default FormError