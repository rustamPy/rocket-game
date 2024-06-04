import Link from 'next/link';
export default function GamesList() {

    const games = [
        { name: 'Rocket Space', href: 'games/rocket' }
    ]

    return (
        <>
            <div style={{ textAlign: 'center', margin: 20 }}>
                <ul>
                    {games.map(g => {
                        return (
                            <li>
                                <span style={{ color: 'red' }}><Link href={g.href}> {g.name} </Link></span>
                            </li>
                        )
                    })}

                </ul>
            </div>
        </>
    )
}