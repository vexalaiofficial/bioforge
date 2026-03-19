import { NextResponse } from 'next/server'

// In production, this would be your actual backend URL
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export async function GET(request, { params }) {
  const { username } = params
  
  try {
    // In development, use mock data for demo
    if (!process.env.NEXT_PUBLIC_API_URL) {
      // Return demo profile for specific usernames
      const demoProfiles = {
        'demo': {
          id: 'profile_demo',
          username: 'demo',
          displayName: 'Demo User',
          bio: 'Creator | Digital Artist | Making cool things 🎨',
          theme: 'midnight',
          avatar: null,
          socials: {
            tiktok: 'demouser',
            instagram: 'demouser',
            twitter: 'demouser',
            youtube: '',
            email: 'demo@bioforge.app',
            website: 'https://example.com'
          },
          appearance: {
            buttonStyle: 'rounded',
            buttonAnimation: true,
            backgroundEffect: 'gradient',
            showBranding: true
          },
          links: [
            { id: '1', title: 'My Portfolio', url: 'https://example.com/portfolio', icon: '🎨', enabled: true },
            { id: '2', title: 'YouTube Channel', url: 'https://youtube.com', icon: '▶️', enabled: true },
            { id: '3', title: 'Instagram', url: 'https://instagram.com', icon: '📷', enabled: true },
            { id: '4', title: 'Book a Call', url: 'https://calendly.com', icon: '📅', enabled: true },
            { id: '5', title: 'My Newsletter', url: '#', icon: '📧', enabled: false },
          ],
          views: 1247,
          clicks: 892
        }
      }
      
      const profile = demoProfiles[username.toLowerCase()]
      if (profile) {
        return NextResponse.json(profile)
      }
      
      // Return 404 for unknown usernames in dev
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
    }
    
    // In production, fetch from backend
    const res = await fetch(`${API_BASE}/api/profiles/${username}`)
    const data = await res.json()
    
    if (!res.ok) {
      return NextResponse.json(data, { status: res.status })
    }
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch profile' }, { status: 500 })
  }
}