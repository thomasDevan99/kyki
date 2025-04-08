import { motion } from "framer-motion"
import "./OrbitingPortal.css" // for flip animations

export default function OrbitingPortal({ show, flipped, onFlip }) {
    if (!show) return null

    const orbitAmount = 20
    const orbitBlocks = []

    for (let i = 0; i < orbitAmount; i++) {
        const angle = (360 / orbitAmount) * i
        orbitBlocks.push(
            <motion.div
                key={`orbit-${i}`}
                style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 0,
                    height: 0,
                }}
                animate={{
                    rotate: 360,
                }}
                transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: "linear",
                }}
            >
                <div
                    style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "#ff0088",
                        borderRadius: 8,
                        transform: `rotate(${angle}deg) translate(150px)`,
                    }}
                />
            </motion.div>
        )
    }

    return (
        <div style={overlay}>
            <div style={centerContainer}>
                {orbitBlocks}
                <div
                    className={`flip-container ${flipped ? "flipped" : ""}`}
                    onClick={onFlip}
                >
                    <div className="flipper">
                        <div className="front">Click Me</div>
                        <div className="back">🎉 Surprise!</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    zIndex: 9999,
    pointerEvents: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}

const centerContainer = {
    position: "relative",
    width: 300,
    height: 300,
    pointerEvents: "auto",
}
