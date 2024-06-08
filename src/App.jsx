import React, { useEffect, useState } from 'react'

const App = () => {

    const [people, setPeople] = useState(null)
    const [characters, setCharacters] = useState(null)

    useEffect(() => {
        getDatos()
        getDatos2()
    }, [])

    const getDatos = async () => {
        try {
            const people = []
            const response = await fetch('https://swapi.tech/api/people')
            const data = await response.json()
            //console.log(data)
            const { results } = data;
            //console.log(results)

            for(let i = 0; i < results.length; i++){
                const { uid, name, url } = results[i];
                console.log(url)
                const detailResponse = await fetch(url)
                const detailData = await detailResponse.json()
                console.log(detailData)
                people.push({...detailData.result.properties, uid})
            }

            setPeople(people)

        } catch (error) {
            console.log(error)
        }
    }

    const getDatos2 = async () => {
        try {
            const response = await fetch('https://swapi.dev/api/people')
            const data = await response.json()
            setCharacters(data.results)

        } catch (error) {
            console.log(error)
        }
    }




    return (
        <>
        <div>App</div>
        <ul>
            {
                !!people && 
                Array.isArray(people) && people.length > 0 &&
                people.map((character) => {
                    return (
                        <li key={character.uid}>
                            {character.name} {character.birth_year} {character.eye_color}
                        </li>
                    )
                })
            }
        </ul>
        <ul>
            {
                !!characters && 
                Array.isArray(characters) && characters.length > 0 &&
                characters.map((character, index) => {
                    return (
                        <li key={index}>
                            {character.name} {character.birth_year} {character.eye_color}
                        </li>
                    )
                })
            }
        </ul>
        </>

    )
}

export default App