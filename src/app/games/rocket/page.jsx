'use client';
import React, { useState, useEffect, useRef } from 'react';

import { FaPlay, FaPause } from 'react-icons/fa';
import './styles.css';

const Game = () => {
    const [rocketX, setRocketX] = useState(180);
    const [rocketY, setRocketY] = useState(700);
    const [blusters, setBlusters] = useState([]);
    const [blusterClip, setBlusterClip] = useState(20);
    const [bg, setBg] = useState('green');
    const [obstacles, setObstacles] = useState([]);
    const [mines, setMines] = useState([]);
    const [level, setLevel] = useState(1);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameState, setGameState] = useState('start'); // "start", "playing", "paused"

    const gameAreaRef = useRef(null);

    const LEVELS = {
        1: { obstacleSpeed: 7, blusterSpeed: 10, blusterClip: 30 },
        2: { obstacleSpeed: 10, blusterSpeed: 20, blusterClip: 50, bg: 'brown' },
        3: { obstacleSpeed: 13, blusterSpeed: 30, blusterClip: 65, bg: 'silver' },
        4: { obstacleSpeed: 16, blusterSpeed: 40, blusterClip: 80, bg: 'gold' },
        5: { obstacleSpeed: 19, blusterSpeed: 50, blusterClip: 60, bg: 'green' },
    };

    const calculateLevel = (score) => {
        if (score >= 350) return 5;
        if (score >= 200) return 4;
        if (score >= 100) return 3;
        if (score >= 30) return 2;
        return 1;
    };

    useEffect(() => {
        if (gameOver || gameState !== 'playing') return;

        const newLevel = calculateLevel(score);

        if (newLevel !== level) {
            setLevel(newLevel);
            setBlusterClip(LEVELS[newLevel].blusterClip);
            setBg(LEVELS[newLevel].bg);
        }

        const { obstacleSpeed } = LEVELS[newLevel] || LEVELS[1];

        const intervalId = setInterval(() => {
            setObstacles((prevObstacles) => {
                const newObstacles = prevObstacles.map(obs => ({
                    ...obs,
                    y: obs.y + obstacleSpeed
                })).filter(obs => obs.y < 800);

                if (newObstacles.some(obs => obs.y >= 700)) {
                    setGameOver(true);
                }

                return newObstacles;
            });

            setMines((prevMines) => {
                const newMines = prevMines.map(obs => ({
                    ...obs,
                    y: obs.y + obstacleSpeed
                })).filter(obs => obs.y < 800);

                if (newMines.some(obs => obs.y >= 700 && Math.abs(obs.x - rocketX) < 40)) {
                    setGameOver(true);
                }

                return newMines;
            });
        }, 100);

        return () => clearInterval(intervalId);
    }, [gameOver, score, level, gameState]);

    useEffect(() => {
        if (gameOver || gameState !== 'playing') return;

        const { blusterSpeed } = LEVELS[level] || LEVELS[1];

        const blusterInterval = setInterval(() => {
            setBlusters((prevBlusters) => {
                const newBlusters = prevBlusters.map(blst => ({
                    ...blst,
                    y: blst.y - blusterSpeed
                })).filter(blst => blst.y > 0);
                return newBlusters;
            });
        }, 100);

        return () => clearInterval(blusterInterval);
    }, [score, level, gameState]);

    useEffect(() => {
        const collisionDetection = setInterval(() => {
            setBlusters((prevBlusters) => {
                const newBlusters = prevBlusters.filter(blst => {
                    const obstacleHit = obstacles.some(obs => obs.y < blst.y && obs.y + 50 > blst.y && Math.abs(obs.x - blst.x) < 40);
                    const mineHit = mines.some(obs => obs.y < blst.y && obs.y + 50 > blst.y && Math.abs(obs.x - blst.x) < 40);

                    if (obstacleHit) {
                        setObstacles((prevObstacles) => prevObstacles.filter(obs => !(obs.y < blst.y && obs.y + 50 > blst.y && Math.abs(obs.x - blst.x) < 40)));
                        setScore(score + 2);
                    } else if (mineHit) {
                        setMines((prevMines) => prevMines.filter(obs => !(obs.y < blst.y && obs.y + 50 > blst.y && Math.abs(obs.x - blst.x) < 40)));
                        setScore(score - 2);
                    }

                    return !obstacleHit && !mineHit;
                });
                return newBlusters;
            });
        }, 50);

        return () => clearInterval(collisionDetection);
    }, [obstacles, mines, gameState]);

    const handleKeyDown = (e) => {
        if (gameOver) return;

        if (e.key === 'ArrowLeft' && rocketX > 0) {
            setRocketX(rocketX - 20);
        } else if (e.key === 'ArrowRight' && rocketX < 360) {  // 360 because the rocket is 40px wide
            setRocketX(rocketX + 20);
        } else if ((e.key === 'x' || e.key === 'X') && blusterClip > 0) {
            setBlusters([...blusters, { x: rocketX + 15, y: rocketY }]); // Adjust bluster position based on rocketX
            setBlusterClip(blusterClip - 1);
        }
    };

    const handleStartPause = () => {
        if (gameState === 'start') {
            setGameState('playing');
        } else if (gameState === 'playing') {
            setGameState('paused');
        } else if (gameState === 'paused') {
            setGameState('playing');
        }
    };

    const handleRestart = () => {
        setRocketX(180);
        setRocketY(700);
        setBlusters([]);
        setObstacles([]);
        setMines([]);
        setLevel(1);
        setScore(0);
        setBlusterClip(LEVELS[1].blusterClip);
        setGameState('playing');
        setGameOver(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [rocketX, blusters, blusterClip, gameOver, gameState]);

    useEffect(() => {
        if (gameOver || gameState !== 'playing') return;

        const obstacleInterval = setInterval(() => {
            const randomX = Math.floor(Math.random() * 360);
            setObstacles((prevObstacles) => [...prevObstacles, { x: randomX, y: 0 }]);
        }, 2000);

        const mineInterval = setInterval(() => {
            const randomX = Math.floor(Math.random() * 200);
            setMines((prevMines) => [...prevMines, { x: randomX, y: 0 }]);
        }, 10000);

        return () => {
            clearInterval(obstacleInterval);
            clearInterval(mineInterval);
        };
    }, [gameOver, gameState]);

    return (
        <div ref={gameAreaRef} className="game-area" style={{ backgroundColor: bg }}>
            <div className='earth'> EARTH </div>
            <div className="rocket" style={{ top: `${rocketY}px`, left: `${rocketX}px` }}>👾</div>
            {blusters.map((blst, index) => (
                <div key={index} className="bluster" style={{ left: `${blst.x}px`, top: `${blst.y}px` }}>🔥</div>
            ))}
            {obstacles.map((obs, index) => (
                <div key={index} className="obstacle" style={{ left: `${obs.x}px`, top: `${obs.y}px` }}>🪨</div>
            ))}
            {mines.map((obs, index) => (
                <div key={index} className="mine" style={{ left: `${obs.x}px`, top: `${obs.y}px` }}>💣</div>
            ))}

            <div className="score">Score: {score} Level: {level} Bluster Clip: {blusterClip}</div>
            {gameOver && <div className="game-over">Game Over <button onClick={handleRestart}>Restart</button></div>}
            {!gameOver &&
                <div>
                    {gameState === 'start' &&
                        <p className='desc'>
                            <b>Objective:</b> Guide the rocket safely through obstacles and mines while shooting down obstacles with blasters.<br />
                            <b>Controls:</b> Use the left and right arrow keys to move the rocket. Press 'X' to shoot blasters.<br />
                            <b>Avoid Obstacles:</b> Avoid colliding with obstacles and mines. Collisions will stop the game.<br />
                            <b>Shoot Blasters:</b> Use blasters to destroy obstacles. Each hit increases your score (+2).<br />
                            <b>Shoot Mines:</b> Avoid shooting the mines. Each hit decrease your score (-2)<br />
                            <b>Level Up:</b> Reach certain score milestones to advance to higher levels with increased difficulty.<br />
                            <b>Game Over:</b> The game ends when the rocket collides with an obstacle.<br />
                        </p>}
                    <button onClick={handleStartPause} className={gameState === 'start' || gameState === 'paused' ? 'play' : 'pause'}>
                        {gameState === 'start' ?
                            <FaPlay />
                            :
                            gameState === 'paused' ?
                                'Resume' : ''}
                    </button>
                </div>}
            {gameState === 'playing' && !gameOver && (
                <button onClick={handleStartPause} className="pause"><FaPause /></button>
            )}
        </div>
    );
};

function App() {
    return (
        <div className="App">
            <Game />
        </div>
    );
}

export default App;
