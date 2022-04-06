import { useState } from "react"


const NewTeamForm = () => {
    const [city, setCity] = useState('')
    const [name, setName] = useState('')
    const [logo, setLogo] = useState('')
    const [player1, setPlayer1] = useState(null)
    const [player2, setPlayer2] = useState(null)
    const [player3, setPlayer3] = useState(null)
    const [player4, setPlayer4] = useState(null)
    const [player5, setPlayer5] = useState(null)

    return (
        <>
            <h1>New Team Form</h1>
            <form>
                <h2>Build your new team!</h2>
                <div>
                    <label htmlFor="city">Team City:</label>
                    <input
                        id='city'
                        type="text"
                        onChange={(e) => setCity(city)}
                        value={city}
                    />
                </div>
                <div>
                    <label htmlFor="name">Team Name:</label>
                </div>
            </form>
        </>
    )
}

export default NewTeamForm