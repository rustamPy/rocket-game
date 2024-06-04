import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';
export default function GamesList() {

    const games = [
        { name: 'Rocket Space', href: 'games/rocket', level: 'easy' }
    ]

    return (
        <>
            <div style={{ textAlign: 'center', margin: 20 }}>
                <ul>
                    {games.map((g, i) => {
                        return (
                            <li key={i}>
                                <span style={{ color: 'red' }}> <Link href={g.href}> {g.name} </Link></span><sup>{g.level} </sup>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </>
    )
}