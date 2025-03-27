# Dream Techniques UI/UX Design - Phase 1

## Design Philosophy
- **Minimalist & Serene**: Calming color palette with deep purples, soft blues, and gentle gradients
- **Intuitive Navigation**: Clear visual hierarchy and seamless transitions
- **Responsive & Fluid**: Smooth animations and adaptive layouts
- **Focus on Content**: Clean typography and ample white space
- **Night-Mode First**: Dark theme primary design to support evening usage

## Color Palette
- **Primary Colors**
  - Deep Purple (#2A1B3D): Main navigation and headers
  - Twilight Blue (#1E3D59): Secondary elements
  - Dream Gold (#FFD700): Accents and call-to-actions
  
- **Secondary Colors**
  - Soft Lavender (#E6E6FA): Background elements
  - Midnight Blue (#191970): Dark mode background
  - Ethereal White (#F8F8FF): Text and highlights

## Typography
- **Headers**: Montserrat (Bold)
  - Clean, modern, excellent readability
  - Size hierarchy: H1 (32px), H2 (24px), H3 (20px)

- **Body Text**: Inter
  - Contemporary, optimized for screens
  - Base size: 16px
  - Line height: 1.6

## Core Components Design

### 1. Main Navigation
- **Floating Side Menu**
  - Collapsible for mobile views
  - Subtle blur effect background
  - Icon + text labels
  - Progress indicators
  - Smooth hover states

### 2. Technique Library Card Design
- **Card Layout**
  - Rounded corners (12px radius)
  - Soft shadow elevation
  - Technique icon (64x64px)
  - Difficulty indicator (stars/dots)
  - Estimated time badge
  - Quick-start button
  
- **Card States**
  - Hover: Subtle lift effect
  - Active: Highlighted border
  - Completed: Success indicator
  - In Progress: Progress bar

### 3. Progress Tracking Dashboard
- **Grid Layout**
  - 2x2 main metrics cards
  - Linear progress bars
  - Circular completion indicators
  - Weekly activity heatmap
  
- **Visual Elements**
  - Animated progress circles
  - Micro-interactions for achievements
  - Dynamic stats updates

### 4. Meditation Interface
- **Player Design**
  - Minimal circular progress indicator
  - Large, touch-friendly controls
  - Time remaining display
  - Volume slider with custom styling
  
- **Background**
  - Subtle gradient animation
  - Optional particle effects
  - Breathing guide animation

### 5. Mobile-Responsive Elements
- **Adaptive Layouts**
  - Stack view for small screens
  - Touch-optimized buttons (min 44px)
  - Bottom navigation bar
  - Pull-to-refresh functionality

## Micro-Interactions
- **Button States**
  - Hover: Scale transform (1.02)
  - Click: Gentle push effect
  - Loading: Pulse animation
  
- **Transitions**
  - Page transitions: Fade + slide
  - Modal animations: Scale + fade
  - Menu transitions: Smooth slide

## Loading States
- **Skeleton Screens**
  - Animated gradient
  - Maintains layout structure
  - Smooth fade-in of content
  
- **Progress Indicators**
  - Custom spinner design
  - Branded loading animations
  - Progress percentage display

## Accessibility Features
- **High Contrast Mode**
  - Enhanced text contrast
  - Distinct interactive elements
  - Clear focus indicators
  
- **Touch Targets**
  - Minimum size: 44x44px
  - Adequate spacing: 8px minimum
  - Clear hit states

## Component Library Structure
- **Base Components**
  - Buttons (Primary, Secondary, Ghost)
  - Input fields
  - Cards
  - Progress indicators
  
- **Composite Components**
  - Technique cards
  - Progress dashboards
  - Media players
  - Navigation elements

## Responsive Breakpoints
- **Mobile**: 320px - 480px
- **Tablet**: 481px - 768px
- **Desktop**: 769px - 1024px
- **Large Desktop**: 1025px+

## Animation Guidelines
- **Duration**
  - Quick transitions: 200ms
  - Page transitions: 300ms
  - Progress animations: 600ms
  
- **Easing**
  - Default: ease-in-out
  - Emphasis: cubic-bezier(0.4, 0, 0.2, 1)
  - Bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55)

## Implementation Priority
1. Core navigation structure
2. Technique library cards
3. Basic progress tracking
4. Meditation interface
5. Mobile responsiveness
6. Loading states
7. Micro-interactions
8. Accessibility features

## Design System Documentation
- Component usage guidelines
- Spacing system (4px grid)
- Typography scale
- Color application rules
- Animation principles
- Accessibility standards
- Responsive patterns 