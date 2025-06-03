
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
			fontFamily: {
				'manrope': ['Manrope', 'sans-serif'],
				'cormorant': ['Cormorant Garamond', 'serif'],
			},
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
				// Wellness palette
				sage: {
					50: 'rgb(247 250 247)',
					100: 'rgb(237 244 237)',
					200: 'rgb(220 234 220)',
					300: 'rgb(187 212 187)',
					400: 'rgb(147 161 143)',
					500: 'rgb(120 134 116)',
					600: 'rgb(95 109 91)',
					700: 'rgb(78 91 74)',
					800: 'rgb(65 76 61)',
					900: 'rgb(54 63 50)',
				},
				sand: {
					50: 'rgb(252 250 247)',
					100: 'rgb(249 245 240)',
					200: 'rgb(243 237 230)',
					300: 'rgb(239 231 218)',
					400: 'rgb(228 218 203)',
					500: 'rgb(207 193 176)',
					600: 'rgb(186 168 148)',
					700: 'rgb(147 131 113)',
					800: 'rgb(120 106 90)',
					900: 'rgb(87 76 63)',
				},
				stone: {
					50: 'rgb(250 249 248)',
					100: 'rgb(245 243 242)',
					200: 'rgb(234 231 229)',
					300: 'rgb(214 209 206)',
					400: 'rgb(168 162 158)',
					500: 'rgb(140 134 129)',
					600: 'rgb(120 113 108)',
					700: 'rgb(87 83 74)',
					800: 'rgb(68 64 60)',
					900: 'rgb(41 37 33)',
				},
				earth: {
					50: 'rgb(249 248 247)',
					100: 'rgb(242 240 238)',
					200: 'rgb(228 224 220)',
					300: 'rgb(200 194 187)',
					400: 'rgb(168 162 158)',
					500: 'rgb(140 134 129)',
					600: 'rgb(120 113 108)',
					700: 'rgb(87 83 74)',
					800: 'rgb(68 64 60)',
					900: 'rgb(41 37 33)',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'organic': '60% 40% 30% 70% / 60% 30% 70% 40%',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-in-left': {
					'0%': { opacity: '0', transform: 'translateX(-30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'slide-in-right': {
					'0%': { opacity: '0', transform: 'translateX(30px)' },
					'100%': { opacity: '1', transform: 'translateX(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'breathe': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'gentle-pulse': {
					'0%, 100%': { opacity: '0.8' },
					'50%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'slide-up': 'slide-up 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-left': 'slide-in-left 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'slide-in-right': 'slide-in-right 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'scale-in': 'scale-in 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'breathe': 'breathe 4s ease-in-out infinite',
				'gentle-pulse': 'gentle-pulse 3s ease-in-out infinite'
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
