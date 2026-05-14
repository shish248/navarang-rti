import { useState } from 'react'

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [records, setRecords] = useState([])

  const [form, setForm] = useState({
    applicant:'',
    subject:'',
    rtiNumber:'',
    receivedDate:'',
    currentStatus:'Reply Pending',
    assignedStaff:'',
    markedDate:'',
    transferredSection:'',
    transferDate:''
  })

  const login = () => {
    if(username === 'admin' && password === 'admin123'){
      setLoggedIn(true)
    } else {
      alert('Invalid login')
    }
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addRTI = () => {
    setRecords([...records, form])

    setForm({
      applicant:'',
      subject:'',
      rtiNumber:'',
      receivedDate:'',
      currentStatus:'Reply Pending',
      assignedStaff:'',
      markedDate:'',
      transferredSection:'',
      transferDate:''
    })
  }

  if(!loggedIn){
    return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>
        <div style={{background:'white',padding:'30px',borderRadius:'10px',width:'320px'}}>
          <h2>RTI Office Portal</h2>

          <input
            placeholder='Username'
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            style={{width:'100%',padding:'10px',marginBottom:'10px'}}
          />

          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            style={{width:'100%',padding:'10px',marginBottom:'10px'}}
          />

          <button onClick={login} style={{width:'100%',padding:'10px'}}>
            Login
          </button>

          <p>Demo Login:</p>
          <p>admin / admin123</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{padding:'20px'}}>
      <h1>RTI Office Portal</h1>

      <div style={{background:'white',padding:'20px',borderRadius:'10px',marginBottom:'20px'}}>
        <h3>New RTI Entry</h3>

        <input name='applicant' placeholder='Applicant Name' value={form.applicant} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

        <input name='subject' placeholder='Subject of RTI' value={form.subject} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

        <input name='rtiNumber' placeholder='RTI Application Number' value={form.rtiNumber} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

        <input type='date' name='receivedDate' value={form.receivedDate} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

        <select name='currentStatus' value={form.currentStatus} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}}>
          <option>Marked to Staff</option>
          <option>Reply Pending</option>
          <option>Reply Received</option>
          <option>Transferred</option>
          <option>Reply Sent</option>
        </select>

        {form.currentStatus === 'Marked to Staff' && (
          <>
            <input name='assignedStaff' placeholder='Staff Name' value={form.assignedStaff} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

            <input type='date' name='markedDate' value={form.markedDate} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
          </>
        )}

        {form.currentStatus === 'Transferred' && (
          <>
            <input name='transferredSection' placeholder='Transferred Section' value={form.transferredSection} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />

            <input type='date' name='transferDate' value={form.transferDate} onChange={handleChange} style={{width:'100%',padding:'10px',marginBottom:'10px'}} />
          </>
        )}

        <button onClick={addRTI} style={{padding:'10px 20px'}}>
          Save RTI
        </button>
      </div>

      <div style={{background:'white',padding:'20px',borderRadius:'10px'}}>
        <h3>RTI Register</h3>

        <table width='100%' border='1' cellPadding='10' style={{borderCollapse:'collapse'}}>
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Subject</th>
              <th>RTI No.</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r,index)=>(
              <tr key={index}>
                <td>{r.applicant}</td>
                <td>{r.subject}</td>
                <td>{r.rtiNumber}</td>
                <td>{r.currentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
