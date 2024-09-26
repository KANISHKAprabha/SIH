export const tokensDark = {
  grey: {
    0: "#ffffff", // Pure white
    10: "#e0e0e0", // Very light grey
    50: "#f1f3f5", // Light grey for subtle UI elements
    100: "#e9ecef", 
    200: "#dee2e6", 
    300: "#ced4da", 
    400: "#adb5bd", 
    500: "#868e96", // Neutral grey for readable text
    600: "#495057", // Dark grey for text contrast
    700: "#343a40", // Darker grey for main text
    800: "#000000", // Dark background
    900: "#141619", // Dark background for sections
  },
  primary: {
    100: "#6A00FF",  // Main purple
    200: "#a64aff",  // Lighter purple
    300: "#ffb1ff",  // Soft purple
  },
  secondary: {
    50: "#00E5FF",   // Bright accent blue
    100: "#00829b",  // Darker blue for contrast
  },
  background: {
    100: "#000000",  // Dark background
    200: "#292929",  // Dark grey background
    300: "#404040",  // Lighter grey background
  },
  text: {
    100: "#FFFFFF", // White text
    200: "#e0e0e0", // Light grey text
  },
};

// Function that reverses the color palette for light theme
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const tokensLight = reverseTokens(tokensDark);

// MUI theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // Palette values for dark mode (darker shades)
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[100],  // Main purple for elements
              light: tokensDark.primary[300], // Light purple for hover states
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[50],  // Bright accent blue for accents
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],  // Neutral grey for text
            },
            background: {
              default: tokensDark.background[100], // Dark background
              alt: tokensDark.background[200],     // Slightly lighter dark background
            },
            text: {
              primary: tokensDark.text[100],  // White text
              secondary: tokensDark.text[200], // Light grey text
            },
            icon: {
              main: tokensDark.text[100],  // White color for icons
            },
          }
        : {
            // Palette values for light mode (reverse tokens)
            primary: {
              ...tokensLight.primary,
              main: tokensLight.primary[300],
              light: tokensLight.primary[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensLight.secondary[100],
              light: tokensLight.secondary[50],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[700],
            },
            background: {
              default: tokensLight.background[100],
              alt: tokensLight.background[200],
            },
            text: {
              primary: tokensLight.text[100],  // White text
              secondary: tokensLight.text[200], // Light grey text
            },
            icon: {
              main: tokensLight.text[100],  // White color for icons
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 14,  // Slightly larger font size for better readability
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 36,
        color: tokensDark.text[100],  // White text for headings
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 30,
        color: tokensDark.text[100],  // White text for subheadings
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
        color: tokensDark.text[100],  // White text for key text
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
        color: tokensDark.text[100],  // White text for small headings
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
        color: tokensDark.text[100],  // White text for body text
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
        color: tokensDark.text[200],  // Light grey text for small text
      },
    },
    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            color: (theme) => theme.palette.icon.main,  // Ensure icons are white
          },
        },
      },
    },
  };
};
