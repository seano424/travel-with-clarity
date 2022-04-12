import React, { useState } from 'react'

export default function Form() {
  const [value, setValue] = useState('')
  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault()
    console.log(value)
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        onChange={(e) => setValue(e.target.value)}
        type="text"
        value={value}
        placeholder="Choose a country"
        className="rounded-full px-3 py-2 focus:outline-none text-black tracking-tighter"
      />
    </form>
  )
}
