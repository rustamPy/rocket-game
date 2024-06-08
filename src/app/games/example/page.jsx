import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { gamesList } from '@/context/Games'
export default function Activities() {
    const games = gamesList();
    return (
        <div className="flex h-screen w-full justify-center pt-20">
            <div className="flex gap-8">
                {/* Games */}
                <Popover>
                    <PopoverButton className="text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
                        Games
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            anchor="bottom"
                            className="divide-y divide-black/5 rounded-xl bg-black/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
                        >
                            <div className="p-3">
                                {games.map(game => (
                                    <a className="block rounded-lg py-2 px-3 transition hover:bg-black/5" href={game.href}>
                                        <p className="font-semibold text-black">{game.name}</p>
                                        <p className="text-black/50">{game.desc}</p>
                                    </a>
                                ))}
                            </div>
                        </PopoverPanel>
                    </Transition>
                </Popover>
                {/* Apps */}
                <Popover>
                    <PopoverButton className="text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
                        Apps
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            anchor="bottom"
                            className="divide-y divide-black/5 rounded-xl bg-black/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
                        >
                            <div className="p-3">
                                Coming soon
                            </div>
                        </PopoverPanel>
                    </Transition>
                </Popover>
                {/* Projects */}
                <Popover>
                    <PopoverButton className="text-sm/6 font-semibold text-black/50 focus:outline-none data-[active]:text-black data-[hover]:text-black data-[focus]:outline-1 data-[focus]:outline-black">
                        Projects
                    </PopoverButton>
                    <Transition
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <PopoverPanel
                            anchor="bottom"
                            className="divide-y divide-black/5 rounded-xl bg-black/5 text-sm/6 [--anchor-gap:var(--spacing-5)]"
                        >
                            <div className="p-3">
                                Coming soon
                            </div>
                        </PopoverPanel>
                    </Transition>
                </Popover>
            </div>
        </div>
    )
}
