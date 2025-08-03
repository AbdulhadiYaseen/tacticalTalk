export const SYSTEM_PROMPT = `
You are TacticalTalk, an AI football tactics coach.

Your job is to explain football strategies, formations, and tactics in a way that is clear, concise, and helpful to players, fans, and coaches.

When answering:
- Provide tactical insights (e.g., formations, pressing styles, buildup structure)
- Break down team strategies (e.g., how teams attack, defend, transition)
- Be neutral and objective
- Avoid unrelated or casual content

FORMATTING RULES:
- Use clean, professional formatting similar to academic or sports analysis articles
- Main title: Use ## for the main heading (e.g., "## Pep Guardiola's Barcelona: A Tactical Masterclass")
- Section headings: Use ### for subheadings (e.g., "### Formation and Structure")
- For main points: Use numbered lists (1., 2., 3., 4.) with bold titles followed by descriptions
- For sub-points: Use bullet points with • symbol  
- Use **bold** for key terms and concepts
- Use *italics* sparingly for emphasis on tactical terms
- Keep paragraphs concise and well-spaced
- Ensure each numbered item and bullet point starts on a new line
- Structure responses with clear sections that flow logically
`;

export const PROMPT_TEMPLATES = {
    matchAnalysis: (teamA: string, teamB: string) => `
  Analyze the tactics of the recent match between ${teamA} and ${teamB}.
  Focus on formations, transitions, pressing, buildup play, and key tactical moments.
  Also cover:
  - Individual player performances and key match-ups.
  - Managerial decisions and impact of substitutions.
  - Set-piece analysis (attacking and defensive).
  `,
    explainTactic: (tactic: string) => `
  Explain the football tactic: ${tactic}.
  Include:
  - How it works and its core principles.
  - When it's typically used and in what game situations.
  - Pros and cons of using this tactic.
  - Notable teams/managers that have successfully (or unsuccessfully) used it, with examples if possible.
  - Key player roles and responsibilities within the tactic.
  - Historical context and evolution of the tactic.
  - How to counter this tactic.
  `,
    explainFormation: (formation: string) => `
  Explain the football formation: ${formation}.
  Include:
  - How it works, including defensive and attacking shapes.
  - When it's typically used and its main objectives.
  - Pros and cons of using this formation.
  - Notable teams/managers that have effectively used it.
  - Specific player roles and responsibilities within the formation.
  - Common variations or fluid transitions to other shapes.
  - How to counter this formation.
  `,
    explainPressing: (pressing: string) => `
  Explain the football pressing: ${pressing}.
  Include:
  - How it works (triggers, intensity, coordinated movements).
  - When it's used and its tactical goals.
  - Pros and cons of implementing this pressing scheme.
  - Notable teams/managers known for this type of pressing.
  - Defensive shape and recovery runs after the press.
  - How to counter this pressing strategy.
  `,
    explainBuildup: (buildup: string) => `
  Explain the football buildup: ${buildup}.
  Include:
  - How it works (e.g., short passing, long balls, using the goalkeeper).
  - When it's used and its objectives (e.g., retain possession, bypass press).
  - Pros and cons of this buildup approach.
  - Notable teams/managers known for this buildup style.
  - The role of the goalkeeper and specific defenders in the buildup.
  - How to break lines and create numerical superiority during buildup.
  - How to counter this buildup strategy.
  `,
    explainTransition: (transition: string) => `
  Explain the football transition: ${transition}.
  Include:
  - How it works (from defense to attack, and attack to defense).
  - When it's used and its main objectives.
  - Pros and cons of this transition strategy.
  - Notable teams/managers renowned for their transition play.
  - Key player roles and specific movements in both offensive and defensive transitions.
  - Training principles to enhance transition play.
  - How to counter effective transitions.
  `,
};

export const generateManagerPrompt = (managerName: string): string => `
Analyze the football tactics and philosophy of ${managerName}.
Cover the following:
- Preferred formations and tactical setups
- Key principles in attack and defense
- Notable matches or tactical masterclasses
- Comparison with other managers if relevant
- If the manager has managed more than one club and has a different style of play for each club, explain the differences and how they are similar or different.
- Player Archetypes/Preferred Player Profiles: What kind of players does the manager typically seek out for specific roles? How do these player types fit into his overall system?
- Training Ground Focus: Are there any particular drills or aspects of training that are known to be emphasized by this manager?
- Adaptability and In-Game Management: How does the manager react to different game situations? Is he known for making effective substitutions or tactical tweaks during a match?
- Influence on Youth/Development: Does the manager have a track record of developing young players or integrating academy graduates into the first team?
- Set-Piece Strategies (Attacking & Defensive): Are there any distinctive patterns or approaches to corners, free-kicks, or throw-ins, both offensively and defensively?
- Pressing Schemes/Counter-Pressing: What are the specifics of their pressing triggers, intensity, and structure?
- Build-Up Play from the Back: How does the manager like his team to initiate attacks from their own half?
- Counter-Attacking Principles: If applicable, what are the key elements of their counter-attacking strategy?
- Mental Aspect/Team Psychology: How does the manager approach team motivation and handling pressure?
- Evolution of Philosophy Over Time: Has the manager's tactical approach evolved throughout their career?
- Controversies or Criticisms (Tactical): Have there been any notable criticisms or debates surrounding their tactical decisions?
`;

export const topManagers = [
    "Pep Guardiola",
    "Carlo Ancelotti",
    "Jürgen Klopp",
    "José Mourinho",
    "Diego Simeone",
    "Antonio Conte",
    "Thomas Tuchel",
    "Julian Nagelsmann",
    "Xabi Alonso",
    "Mikel Arteta",
    "Erik ten Hag",
    "Luis Enrique",
    "Mauricio Pochettino",
    "Roberto Mancini",
    "Massimiliano Allegri",
    "Unai Emery",
    "Simone Inzaghi",
    "Gian Piero Gasperini",
    "Ruben Amorim",
    "Didier Deschamps",
    "Lionel Scaloni",
    "Hans-Dieter Flick",
    "Roberto De Zerbi",
    "Ange Postecoglou",
    "Arne Slot",
    "Thiago Motta",
    "Graham Potter",
    "Eddie Howe",
    "Luciano Spalletti",
    "Oliver Glasner",
    "Manuel Pellegrini",
    "David Moyes",
    "Jesse Marsch",
    "Brendan Rodgers",
    "Paulo Fonseca",
    "Marco Silva",
    "Nuno Espírito Santo",
    "Andoni Iraola",
    "Thomas Frank",
    "Kieran McKenna",
    "Enzo Maresca",
    "Fabian Hürzeler",
    "Vincent Kompany",
    "Sir Alex Ferguson",
    "Rinus Michels",
    "Helenio Herrera",
    "Arrigo Sacchi",
    "Johan Cruyff",
    "Bob Paisley",
    "Brian Clough",
    "Valeriy Lobanovskyi",
    "Giovanni Trapattoni",
    "Ernst Happel",
    "Miguel Muñoz",
    "Vittorio Pozzo",
    "Béla Guttmann",
    "Jock Stein",
    "Herbert Chapman",
    "Matt Busby",
    "Vicente del Bosque",
    "Luiz Felipe Scolari",
    "Fabio Capello",
    "Bobby Robson",
    "Ottmar Hitzfeld"
];

export default {
    SYSTEM_PROMPT,
    PROMPT_TEMPLATES,

};