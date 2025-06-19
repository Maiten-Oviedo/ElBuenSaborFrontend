type Props = {
  placeholder?: string
  type?: string
  value?: string
  whiteText?: boolean
  name?: string
  required?: boolean
  readOnly?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = ({
  placeholder,
  type = 'text',
  value,
  whiteText = false,
  name,
  required = false,
  readOnly = false,
  onChange,
}: Props) => {
  return (
    <input
      name={name}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      value={value}
      required={required}
      readOnly={readOnly}
      className={`bg-none italic border-b-2 border-[#B9B9B9] w-full focus:outline-none focus:transition-all ${
        whiteText
          ? 'text-white focus:text-white focus:border-b-white'
          : 'text-[#727272] focus:text-black focus:border-b-black'
      } ${readOnly ? 'cursor-default' : ''}`}
    />
  )
}

export default Input
