import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <main className="Missing">
        <h1>Page not found</h1>
        <p>
          <Link to={'/'}>Home</Link>
        </p>
    </main>  
    )
}

export default Missing