import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import './App.css'


type FormValues = {
  message: string
}

export const App = () => {
  
  const socket = io("localhost:3000")

  const { register, handleSubmit, reset } = useForm<FormValues>()
  const [message, setMessages] = useState([''])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if(data.message === '') return
    socket.emit('sendMessage', data.message)
    reset()
  }
  
  useEffect(() => {
    socket.on('getMessage', (receive: string[]) => {
      setMessages(receive)
    })
  }, [...message])
  
  return (
    <div className="App">
      <h1>Socket.IO Simple WebChat</h1>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='card'>
          <fieldset>
            <legend>TimeLine</legend>
            <div className='card-table'>
              <table>
                <tbody>
                  {
                    message.slice(0).reverse().map(d => {
                      return (
                        <tr>
                          <td>{d}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
            
          </fieldset>
        </div>

        <div className='card'>
          <div>
            <textarea {...register("message")} ></textarea>
          </div>
          
          <button type='submit'>Send to Message</button>
        </div>
      </form>
    </div>
  )
}

export default App
