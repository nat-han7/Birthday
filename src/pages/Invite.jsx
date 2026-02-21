import { useParams} from "react-router-dom";
import DecryptTransition from "../components/Decrypt";
import { useState, useEffect } from "react";
import Renderer from "../components/Renderer";

function Invite() {

    const { code } = useParams();
    const textes1 = [
        "Am 2. März feiere ich meinen 14. Geburtstag!",
        "Du bist herzlich eingeladen, mit mir zu feiern!",
        `Wir werden Kuchen, Waffeln und Burger ${code === "8715" ? "(auch vegetarisch)" : ""} essen!`
    ]

    const names = {
        "4827": "Paul",
        "1936": "David",
        "7504": "Constantin",
        "6289": "Noa",
        "3041": "Noah",
        "8715": "Casimir"
    }

    const name = names[code] || "NOT_INVITED";

    let [textIndex1, setTextIndex1] = useState(0);

    function nextText1() {
        if (textIndex1 < textes1.length - 1) {
            setTextIndex1(textIndex1 + 1);
        }
        else {
            setSceneIndex(1);
        }
    }

    const scenes = [
        (
            <>
                <p>{textes1[textIndex1]}</p>
                <button onClick={nextText1}>Weiter</button>
            </>
        ),
        (
            <Renderer schema={{
                type: "card",
                title: "Party Details",
                fields: [
                    { label: "Datum", value: "2. März 2024" },
                    { label: "Uhrzeit", value: "18:00 Uhr" },
                    { label: "Ort", value: "Rebweg 1, 79540 Lörrach" }
                ]
            }} callback={() => setSceneIndex(2)} />
        ),
        /*
        (
            <></>
        ),
        */
        (
            <div>
                <p>Ich freue mich auf dich, {name}!</p>
                <button onClick={() => {
                    const url = "https://www.addevent.com/event/3n1ngrc44qs7";
                    window.open(url, "_blank");
                }}><span className="button-text">Zum Kalender hinzufügen</span></button>
            </div>
        )
    ]

    let [sceneIndex, setSceneIndex] = useState(0);

    return (
        <div className="invite">
            <DecryptTransition from={code} to={name} speed={100} delay={100} prefix="Hey " suffix="!" />
            {scenes[sceneIndex]}
        </div>
    );
}

export default Invite;