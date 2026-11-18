/* ==========================================================================
   The six strands of the curriculum
   --------------------------------------------------------------------------
   Colours were checked with a palette validator so they stay distinguishable
   for colour-blind students. Two of them are pale against white, so a
   strand is ALWAYS shown with its name as well, never by colour alone.
   `ink` is a darker shade used for text.
   ========================================================================== */
export const STRANDS = [
  { id: "number", name: "Number", colour: "#2a78d6", ink: "#1b5aa6", tint: "#e8f1fc", icon: "number" },
  { id: "algebra", name: "Algebra", colour: "#eb6834", ink: "#b2461a", tint: "#fdeee7", icon: "algebra" },
  { id: "ratio", name: "Ratio, Proportion and Rates of Change", short: "Ratio & Proportion", colour: "#1baf7a", ink: "#11734f", tint: "#e3f6ef", icon: "ratio" },
  { id: "geometry", name: "Geometry and Measures", short: "Geometry", colour: "#6250d6", ink: "#4a3aa8", tint: "#eeebfb", icon: "geometry" },
  { id: "statistics", name: "Statistics", colour: "#008300", ink: "#006400", tint: "#e3f3e3", icon: "statistics" },
  { id: "probability", name: "Probability", colour: "#e87ba4", ink: "#a8325f", tint: "#fcebf2", icon: "probability" },
];

export const getStrand = (id) => STRANDS.find((s) => s.id === id);
