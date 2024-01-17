interface InputProps {
    value: string;
    handleChange: (value: string) => void;
    handleSubmit: () => void
}

export const Input = ({ value, handleChange, handleSubmit }: InputProps) => (
    <div>
        <input onChange={(e) => handleChange(e.target.value)} value={value} />
        <button onClick={handleSubmit}>Search</button>
    </div>
)
