import React from 'react'
import styled from 'styled-components'
// function component

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: #232632;
  border-radius: 10px;
  padding: 5px;
  border: 2px solid #343744;
`

const TextInput = styled.input`
  padding: 5px;
  font-size: .7em;
  background: #232632;
  color: #d3d4d6;
  width: 100%;
  margin-right: 7px;
  border: 0px;
  -webkit-apperance: none;
  &:placeholder-shown {
    font-style: italic;
  }
`

const Button = styled.button`
  background: #232632;
  color: #00a7fa;
  width: 80px;
  height: 32px;
  font-size: 1.7em;
  border: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NewToDoForm = ({ onChange, draft, onSubmit }, ...props) => (
  <Container>
    <TextInput
      type='text'
      onChange={onChange}
      value={draft}
      placeholder='add new task'
    />
    <Button onClick={onSubmit}>+</Button>
  </Container>
)

export default NewToDoForm
