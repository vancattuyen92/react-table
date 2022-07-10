import React, {useState, useEffect} from 'react'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const url = 'https://jsonplaceholder.typicode.com/comments'
let defaultUsers = []

function SortEmail(x,y) {
  if (x.email < y.email) {
    return -1
  } else return 1
}

function SortName(x,y) {
  if (x.name < y.name) {
    return -1
  } else return 1
}

function App() {
  const [users, setUsers] = useState()
  const [input, setInput] = useState({search:''})
  const fetchData = async() => {
    const res = await fetch(url)
    const data = await res.json()
    setUsers(data)
    defaultUsers = data
  }

  useEffect(() => {
    fetchData();
  },[])

  function sortEmail() {
    const newUsers = [...users]
    const data = newUsers.sort(SortEmail)
    console.log('email alphabet : ', data)
    setUsers(data)
  }

  function sortName() {
    const newUsers = [...users]
    const data = newUsers.sort(SortName)
    console.log('name alphabet : ', data)
    setUsers(data)
  }

  function onChange(e) {
    const {name,value} = e.target
    setInput(prevState => {
      return {
        ...prevState,
        [name]: value
      }
    })
    const newUsers = defaultUsers.filter((item) => 
      item.name.toLowerCase().includes(value) || item.email.toLowerCase().includes(value))
    setUsers(newUsers)

    console.log('search key:', value)
    console.log('item searching...:', newUsers)

  }



  return (
    <div className="App container" style={{"marginTop":"20px"}}>
      <Form style={{"marginTop":"20px", "display":"flex"}}>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control type="text" placeholder="Searching..." onChange={onChange} value={input.search} name="name" />
        </Form.Group>
        <Button variant="primary" className="mb-3" type="submit" >
          Search
        </Button>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME <button onClick={SortName}>Sort</button></th>
            <th>EMAIL <button onClick={sortEmail}>Sort</button></th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
          </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default App;
