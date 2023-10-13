import { createSignal, onMount } from 'solid-js'
import './styles.css'
import jsonResume from './info.json'

function App() {

  let data = JSON.parse(JSON.stringify(jsonResume))

  onMount(() => {
    console.log(data)
  })


  return (
    <div class="document " docskinwidth="630">
      <div class="section">
        <input type="text" class="name" value={data.name} />
        <input type="text" class="lastName" value={data.lastName} />
      </div>
      <div class="section contact-info">
        <input type="text" class="contact-info" value={`${data.email} | ${data.phoneNumber}`} />
        <input type="text" class="contact-info" value={`${data.address}`} />
      </div>

    </div>
  )
}

export default App
