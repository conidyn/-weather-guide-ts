interface InputProps {
    value: string | undefined;
    handleChange: (value: string) => void;
}

export const Input = ({value, handleChange}: InputProps) => {

    return (
        <input onChange={(e) => handleChange(e.target.value)} value={value} />
    )

}