import React from 'react';
import ReactDOM from 'react-dom';
import { Picker, Item, defaultTheme, Provider as SpectrumThemeProvider, View } from '@adobe/react-spectrum'

export type Theme = 'light' | 'dark';

export function createThemeSelection(onChange: (newThemne: Theme) => void) {
  ReactDOM.render(<ThemeSelection onChange={onChange} />, document.getElementById('theme'));
};

function ThemeSelection({ onChange }: { onChange: (newTheme: Theme) => void }) {
  const [theme, setTheme] = React.useState(getPreferredTheme());

  return (
    <SpectrumThemeProvider colorScheme={theme} theme={defaultTheme}>
      <View position="absolute" bottom="size-200" left="size-200">
        <Picker
          label="Theme"
          defaultSelectedKey={theme}
          onSelectionChange={(newTheme: 'light' | 'dark') => {
            document.cookie = `preferTheme=${newTheme}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
            onChange(newTheme);
            setTheme(newTheme);
          }}
        >
          <Item key="light">Light</Item>
          <Item key="dark">Dark</Item>
        </Picker>
      </View>
    </SpectrumThemeProvider>
  );
}

export function getPreferredTheme(): Theme {
  return document.cookie.includes('preferTheme=dark')
    ? 'dark'
    : document.cookie.includes('preferTheme=light')
      ? 'light'
      : (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'dark'
        : 'light';
}
