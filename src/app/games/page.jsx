import Link from 'next/link';
import { gamesList } from '@/context/Games';
export default function GamesList() {

    const games = gamesList();
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