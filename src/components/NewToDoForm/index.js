import React from 'react'

// function component

const NewToDoForm = ({onChange, draft, onSubmit}, ...props) => (
  <div>
    <input type='text' onChange={onChange} value={draft} />
    <button onClick={onSubmit}>Add</button>
  </div>
)

export default NewToDoForm
