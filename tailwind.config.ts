
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				terminal: {
					bg: '#0B0B0E',           // Updated darker background like the image
					text: '#FFFFFF',          // White text
					green: '#00FF00',         // Keeping the green for some elements
					cyan: '#00BFFF',          // Bright blue like in the image
					yellow: '#FFFF00',
					red: '#FF0000',           // Bright red like in the image
					purple: '#FF00FF',
					blue: '#2080FF',          // Matching the blue from the image
					gray: '#808080',
					darkGray: '#111111',
					white: '#FFFFFF',
					lightBlue: '#3B8EEA'      // Light blue for folder names
				}
			},
			fontFamily: {
				mono: ['Consolas', 'Monaco', 'Lucida Console', 'Liberation Mono', 'monospace'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' },
				},
				blink: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0' },
				},
				typing: {
					'0%': { width: '0' },
					'100%': { width: '100%' },
				},
				'text-fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' },
				},
				'glow': {
					'0%': { textShadow: '0 0 4px rgba(0, 255, 0, 0.6)' },
					'50%': { textShadow: '0 0 16px rgba(0, 255, 0, 0.8)' },
					'100%': { textShadow: '0 0 4px rgba(0, 255, 0, 0.6)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				blink: 'blink 1s step-start infinite',
				typing: 'typing 2s steps(40, end)',
				'text-fade-in': 'text-fade-in 0.5s ease-in',
				'glow': 'glow 1.5s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
