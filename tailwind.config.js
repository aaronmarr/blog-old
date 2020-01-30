module.exports = {
      theme: {
            maxWidth: {

                  "xs": "20rem",
                  "sm": "24rem",
                  "md": "28rem",
                  "lg": "30rem",
                  "xl": "34rem",
                  "2xl": "42rem",
                  "3xl": "48rem",
                  "4xl": "56rem",
                  "5xl": "64rem",
                  "6xl": "72rem",
                  "full": "100%",
            },

    fontFamily: {
      sans: ['"Untitled Sans"', 'sans-serif'],
          serif: ['"Tiempos Text"', 'serif'],
          mono: ['"Pitch Sans"', 'monospace'],
          headline: ['"Adieu"'],
    },

    colors: {
      indigo: '#5c6ac4',
      blue: '#007ace',
      red: '#de3618',
      // warm gray
      "gray-0": "#F7F7F7",
      "gray-1": "#E1E1E1",
      "gray-2": "#CFCFCF",
      "gray-3": "#B1B1B1",
      "gray-4": "#9E9E9E",
      "gray-5": "#7E7E7E",
      "gray-6": "#626262",
      "gray-7": "#515151",
      "gray-8": "#3B3B3B",
      "gray-9": "#222222",
      "gray-10": "#1b1b1b",
      // blue vivid
      "blue-0": "#E6F6FF",
      "blue-1": "#BAE3FF",
      "blue-2": "#7CC4FA",
      "blue-3": "#47A3F3",
      "blue-4": "#2186EB",
      "blue-5": "#0967D2",
      "blue-6": "#0552B5",
      "blue-7": "#03449E",
      "blue-8": "#01337D",
      "blue-9": "#002159",
      // teal
      "teal-0": "#EFFCF6",
      "teal-1": "#C6F7E2",
      "teal-2": "#8EEDC7",
      "teal-3": "#65D6AD",
      "teal-4": "#3EBD93",
      "teal-5": "#27AB83",
      "teal-6": "#199473",
      "teal-7": "#147D64",
      "teal-8": "#0C6B58",
      "teal-9": "#014D40",
      // pink vivid
      "pink-0": "#FFE3EC",
      "pink-1": "#FFB8D2",
      "pink-2": "#FF8CBA",
      "pink-3": "#F364A2",
      "pink-4": "#E8368F",
      "pink-5": "#DA127D",
      "pink-6": "#BC0A6F",
      "pink-7": "#A30664",
      "pink-8": "#870557",
      "pink-9": "#620042",
      // yellow vivid
      "yellow-0": "#FFFBEA",
      "yellow-1": "#FFF3C4",
      "yellow-2": "#FCE588",
      "yellow-3": "#FADB5F",
      "yellow-4": "#F7C948",
      "yellow-5": "#F0B429",
      "yellow-6": "#DE911D",
      "yellow-7": "#CB6E17",
      "yellow-8": "#B44D12",
          "yellow-9": "#8D2B0B",



          /* Base component color of "Polar Night".
  Used for texts, backgrounds, carets and structuring characters like curly- and square brackets.
  Markup:
  <div style="background-color:#2e3440; width=60; height=60"></div>
  Styleguide Nord - Polar Night

          */
 "nord0-dark": "#252a35",
          nord0: "#2e3440",

  /*
  Lighter shade color of the base component color.
  Used as a lighter background color for UI elements like status bars.
  Markup:
  <div style="background-color:#3b4252; width=60; height=60"></div>
  Styleguide Nord - Polar Night
  */

          nord1: "#3b4252",

  /*
  Lighter shade color of the base component color.
  Used as line highlighting in the editor.
  In the UI scope it may be used as selection- and highlight color.
  Markup:
  <div style="background-color:#434c5e; width=60; height=60"></div>
  Styleguide Nord - Polar Night
  */
          nord2: "#434c5e",

  /*
  Lighter shade color of the base component color.
  Used for comments, invisibles, indent- and wrap guide marker.
  In the UI scope used as pseudoclass color for disabled elements.
  Markup:
  <div style="background-color:#4c566a; width=60; height=60"></div>
  Styleguide Nord - Polar Night
  */
          nord3: "#4c566a",

  /*
  Base component color of "Snow Storm".
  Main color for text, variables, constants and attributes.
  In the UI scope used as semi-light background depending on the theme shading design.
  Markup:
  <div style="background-color:#d8dee9; width=60; height=60"></div>
  Styleguide Nord - Snow Storm
  */
          nord4: "#d8dee9",

  /*
  Lighter shade color of the base component color.
  Used as a lighter background color for UI elements like status bars.
  Used as semi-light background depending on the theme shading design.
  Markup:
  <div style="background-color:#e5e9f0; width=60; height=60"></div>
  Styleguide Nord - Snow Storm
  */
          nord5: "#e5e9f0",

  /*
  Lighter shade color of the base component color.
  Used for punctuations, carets and structuring characters like curly- and square brackets.
  In the UI scope used as background, selection- and highlight color depending on the theme shading design.
  Markup:
  <div style="background-color:#eceff4; width=60; height=60"></div>
  Styleguide Nord - Snow Storm
  */
          nord6: "#eceff4",

  /*
  Bluish core color.
  Used for classes, types and documentation tags.
  Markup:
  <div style="background-color:#8fbcbb; width=60; height=60"></div>
  Styleguide Nord - Frost
  */
          nord7: "#8fbcbb",

  /*
  Bluish core accent color.
  Represents the accent color of the color palette.
  Main color for primary UI elements and methods/functions.
  Can be used for
    - Markup quotes
    - Markup link URLs
  Markup:
  <div style="background-color:#88c0d0; width=60; height=60"></div>
  Styleguide Nord - Frost
  */
          nord8: "#88c0d0",

  /*
  Bluish core color.
  Used for language-specific syntactic/reserved support characters and keywords, operators, tags, units and
  punctuations like (semi)colons,commas and braces.
  Markup:
  <div style="background-color:#81a1c1; width=60; height=60"></div>
  Styleguide Nord - Frost
  */
          nord9: "#81a1c1",

  /*
  Bluish core color.
  Used for markup doctypes, import/include/require statements, pre-processor statements and at-rules (`@`).
  Markup:
  <div style="background-color:#5e81ac; width=60; height=60"></div>
  Styleguide Nord - Frost
  */
          nord10: "#5e81ac",

  /*
  Colorful component color.
  Used for errors, git/diff deletion and linter marker.
  Markup:
  <div style="background-color:#bf616a; width=60; height=60"></div>
  Styleguide Nord - Aurora
  */
          nord11: "#bf616a",

  /*
  Colorful component color.
  Used for annotations.
  Markup:
  <div style="background-color:#d08770; width=60; height=60"></div>
  Styleguide Nord - Aurora
  */
  nord12: "#d08770",

  /*
  Colorful component color.
  Used for escape characters, regular expressions and markup entities.
  In the UI scope used for warnings and git/diff renamings.
  Markup:
  <div style="background-color:#ebcb8b; width=60; height=60"></div>
  Styleguide Nord - Aurora
  */
          nord13: "#ebcb8b",

  /*
  Colorful component color.
  Main color for strings and attribute values.
  In the UI scope used for git/diff additions and success visualizations.
  Markup:
  <div style="background-color:#a3be8c; width=60; height=60"></div>
  Styleguide Nord - Aurora
  */
          nord14: "#a3be8c",

  /*
  Colorful component color.
  Used for numbers.
  Markup:
  <div style="background-color:#b48ead; width=60; height=60"></div>
  Styleguide Nord - Aurora
  */
          nord15: "#b48ead",
    },
    extend: {}
  },
  variants: {},
  plugins: []
}
