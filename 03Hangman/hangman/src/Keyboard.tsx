import style from "./Keyboard.module.css"

const KEYS = [
    ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"], 
    ["k", "l", "m", "n", "o", "p", "q", "r", "s"], 
    ["t", "u", "v", "w", "x", "y", "z"],
];

type KeyboardProps = {
    //peale kaotust ei saaks nuppe vajutada
   disabled: boolean;
   activeLetters: string[];
   inactiveLetters: string[];
   addGuessedLetter: (letter: string) => void; 
};

export function Keyboard({
    activeLetters,
    disabled = false,
    inactiveLetters,
    addGuessedLetter
}: KeyboardProps) {
    return (
        <div
            style={{
            display: "flex",
            gridTemplateColumns: "repeat(auto-fit, minmax (75px, 1fr))",
            gap: ".5em"   
        }}
    >
       {/* kontrollitakse sisestatud tähtesid */}
            {KEYS.map(key => {
                const isActive = activeLetters.includes(key)
                const isInactive = inactiveLetters.includes(key)
                return ( 
                    <button
                        onClick={() => addGuessedLetter(key)}
                        className={`${style.btn} ${isActive ? style.active : ""}
                            ${
                                isInactive ? style.inactive : ""
                            }`}
                        disabled={isInactive || isActive || disabled}
                        key={key}
                    >
                        {key}
                    </button>    
                )
            })}
        </div>
    )
}                
