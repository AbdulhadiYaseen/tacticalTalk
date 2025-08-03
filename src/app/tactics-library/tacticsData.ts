
export type Tactic = {
    id: string;
    title: string;
    description: string;
    category: "Attacking" | "Defending" | "Transitions";
  };
  
  export const tactics: Tactic[] = [
    {
      id: "1",
      title: "High Press",
      description: "A strategy to win the ball back high up the pitch.",
      category: "Attacking",
    },
    {
      id: "2",
      title: "Low Block",
      description: "Defending deep with many players behind the ball.",
      category: "Defending",
    },
    {
      id: "3",
      title: "Counter Attack",
      description: "Quickly transitioning from defense to attack.",
      category: "Transitions",
    },
    
  ];