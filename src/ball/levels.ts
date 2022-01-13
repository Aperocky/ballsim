
export type Level = {
    level: number;
    exp: number;
    mass: number;
    radius: number;
    color: string;
}

export const LEVELS: Level[] = [
    {
        level: 0,
        exp: 0,
        mass: 1,
        radius: 10,
        color: "#ff0000"
    },
    {
        level: 1,
        exp: 1000,
        mass: 2,
        radius: 12,
        color: "#cc0022"
    },
    {
        level: 2,
        exp: 2000,
        mass: 4,
        radius: 15,
        color: "#aa0044"
    },
    {
        level: 3,
        exp: 4000,
        mass: 8,
        radius: 20,
        color: "#880066"
    },
    {
        level: 4,
        exp: 8000,
        mass: 16,
        radius: 25,
        color: "#660088"
    },
    {
        level: 5,
        exp: 20000,
        mass: 32,
        radius: 32,
        color: "#3300bb"
    },
    {
        level: 6,
        exp: 50000,
        mass: 64,
        radius: 40,
        color: "#0000ee"
    }
]
