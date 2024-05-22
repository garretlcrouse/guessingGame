import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";


const GuessingGame = () => {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("Start Guessing");
    const [randomNumber, setRandomNumber] = useState(null);
    const [timesGuessed, setTimesGuessed] = useState(null);

    useEffect(() => {
        if (randomNumber === null) {
            setRandomNumber(
                JSON.parse(localStorage.getItem("random")) || generateNum()
            )
        }
        if (timesGuessed === null) {
            setTimesGuessed(
                JSON.parse(localStorage.getItem("guesses")) || 0
            )
        }
    }, [])

    function generateNum() {
        let random = Math.floor(Math.random() * 100);
        localStorage.setItem("random", JSON.stringify(random));
        return random;
    }

    function handleSubmit(event) {
        event.preventDefault();
        let parseNum = parseInt(guess);

        if (parseNum === randomNumber) {
            setMessage("Hey you got it!")
        }
        else if (parseNum > randomNumber) {
            setMessage("Hey that's too high!")
        }
        else {
            setMessage("Hey too low")
        }

        setTimesGuessed(timesGuessed + 1);
        localStorage.setItem("guesses", JSON.stringify(timesGuessed + 1));
    }

    function handleChange(event) {

        if (!isNaN(event.target.value)) {
            setGuess(event.target.value);
        }
        else {
            alert("hey type a number")
        }
    }

    function reset() {
        setGuess("");
        setMessage("StartGuessing!");
        setTimesGuessed(0);
        setRandomNumber(generateNum());
        localStorage.removeItem("guesses");
    }

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb=3">
                    <Form.Label>
                        I am thinking of a number between 1 and 100, Guess the lucky number!
                    </Form.Label>
                    <br />
                    <Form.Label>
                        You have made {timesGuessed} guesses
                    </Form.Label>
                    <Form.Control type="text" value={guess} name="guess" onChange={handleChange} />

                    <Button type="submit">Guess</Button>
                    <Form.Label>{message}</Form.Label>
                    <Button onClick={reset} type="button">Reset</Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default GuessingGame