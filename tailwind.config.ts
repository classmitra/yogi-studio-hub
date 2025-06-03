
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
				'dongle': ['Dongle', 'sans-serif'],
				'dm-sans': ['DM Sans', 'sans-serif'],
				'inter': ['Inter', 'sans-serif'],
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
				// Minimal grayscale palette
				minimal: {
					white: '#ffffff',
					'off-white': '#fafafa',
					'light-gray': '#f5f5f5',
					'mid-gray': '#e0e0e0',
					'dark-gray': '#646464',
					black: '#000000',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			spacing: {
				'18': '4.5rem',
				'88': '22rem',
				'128': '32rem',
				'160': '40rem',
				'192': '48rem',
			},
			fontSize: {
				'xs': ['0.75rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'sm': ['0.875rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'base': ['1rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
				'2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
				'3xl': ['1.875rem', { lineHeight: '1.3', letterSpacing: '0.02em' }],
				'4xl': ['2.25rem', { lineHeight: '1.2', letterSpacing: '0.02em' }],
				'5xl': ['3rem', { lineHeight: '1.1', letterSpacing: '0.02em' }],
				'6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '0.02em' }],
				'7xl': ['4.5rem', { lineHeight: '1', letterSpacing: '0.02em' }],
				'8xl': ['6rem', { lineHeight: '1', letterSpacing: '0.02em' }],
				'9xl': ['8rem', { lineHeight: '1', letterSpacing: '0.02em' }],
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
				'fade-in-minimal': {
					'0%': { opacity: '0', transform: 'translateY(40px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up-minimal': {
					'0%': { opacity: '0', transform: 'translateY(60px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'stagger-in': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'breathe-minimal': {
					'0%, 100%': { transform: 'scale(1) rotate(0deg)', opacity: '0.7' },
					'50%': { transform: 'scale(1.02) rotate(1deg)', opacity: '1' }
				},
				'float-minimal': {
					'0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
					'33%': { transform: 'translateY(-10px) rotate(1deg)' },
					'66%': { transform: 'translateY(-5px) rotate(-1deg)' }
				},
				'gentle-fade': {
					'0%, 100%': { opacity: '0.6' },
					'50%': { opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in-minimal': 'fade-in-minimal 0.8s cubic-bezier(0.25, 0.25, 0.25, 1)',
				'slide-up-minimal': 'slide-up-minimal 1s cubic-bezier(0.25, 0.25, 0.25, 1)',
				'stagger-in': 'stagger-in 0.6s cubic-bezier(0.25, 0.25, 0.25, 1)',
				'breathe-minimal': 'breathe-minimal 6s ease-in-out infinite',
				'float-minimal': 'float-minimal 8s ease-in-out infinite',
				'gentle-fade': 'gentle-fade 4s ease-in-out infinite'
			},
			backdropBlur: {
				xs: '2px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
