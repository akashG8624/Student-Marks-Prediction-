import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'
import {useState} from 'react'

export default function Stusent_marks() {
    const [name,setName] = useState("")
    const [math,setMath] = useState("")
    const [physics,setPhysics] = useState("")
    const [chemistry,setChemistry] = useState("")
    const [predict,setPredict] = useState(null)



    const handelSubmit = async (e)=>{
        e.preventDefault();
        const formdata = new FormData()
        formdata.append('name',name)
        formdata.append("math_marks",math)
        formdata.append("physics_marks",physics)
        formdata.append("chemistry_marks",chemistry)

        try{
            const res = await axios.post('http://127.0.0.1:8000/api/pre/',formdata,{
                headers:{
                    "Content-Type":"multipart/form-data"
                }
            })
            setName('')
            setMath('')
            setPhysics('')
            setChemistry('')
            setPredict(res.data.predicted_result)
            console.log(res)
        }catch(error){
            console.error(error)
        }

    }
  return (
    <div>
        <h2>Student Marks Prediction</h2>
            <Form onClick={handelSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" value = {name} onChange={(e)=>setName(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Math Marks</Form.Label>
        <Form.Control type="number" placeholder="Enter Math MArks"     min={0} 
    max={100}
     value = {math} onChange={(e)=>setMath(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Physics Marks</Form.Label>
        <Form.Control type="number" placeholder="Enter Physics Marks"     min={0} 
    max={100}
     value = {physics} onChange={(e)=>setPhysics(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="enter Chemistry Marks"     min={0} 
    max={100}
     value = {chemistry} onChange={(e)=>setChemistry(e.target.value)}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
       {predict !== null && (
  <div style={{ marginTop: "20px" }}>
    <h4>Predicted Result:</h4>
<p>{(Number(predict) * 100).toFixed(2)} %</p>  </div>
)}

    </Form>
    </div>
  )
}
