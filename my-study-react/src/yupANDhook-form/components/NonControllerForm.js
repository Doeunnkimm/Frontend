import TextField from '@mui/material/TextField'

export default function FormInputText2({
  name,
  register,
  errors,
  label,
  onChangeHandler,
  value,
  handleChange,
  ...rest
}) {
  return (
    // <div>
    //   <label>{label}</label>
    //   <input
    //     {...register(name)}
    //     {...rest}
    //   />
    //   {errors[name] && <p>{errors[name].message}</p>}
    // </div>
    <TextField
      {...register(name)}
      name={name}
      helperText={errors[name] ? errors[name].message : null}
      size='small'
      error={!!errors[name]}
      onChange={handleChange}
      value={value || ''}
      fullWidth
      label={label}
      variant='outlined'
      {...rest}
    />
  )
}
